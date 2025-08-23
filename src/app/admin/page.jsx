"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Space,
  Popconfirm,
  Image,
  Switch,
  Typography,
  Row,
  Col,
  Divider
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  ArrowLeftOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useProducts } from '@/hooks/useProducts';
import { seedDatabase } from '@/lib/seedData';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AdminPage = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [seeding, setSeeding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  
  const { products, loading, error, addProduct, updateProduct, deleteProduct, fetchProducts } = useProducts();

  // Check authentication on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      message.error("Please login to access admin panel");
      router.push('/admin/login');
      return;
    }
  }, [router]);

  const handleAddProduct = () => {
    setEditingProduct(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setModalVisible(true);
  };

  const handleDeleteProduct = async (id) => {
    const result = await deleteProduct(id);
    if (result.success) {
      message.success('Product deleted successfully');
    } else {
      message.error(result.error || 'Failed to delete product');
    }
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editingProduct) {
        const result = await updateProduct(editingProduct.id, values);
        if (result.success) {
          message.success('Product updated successfully');
          setModalVisible(false);
          form.resetFields();
        } else {
          message.error(result.error || 'Failed to update product');
        }
      } else {
        const result = await addProduct(values);
        if (result.success) {
          message.success('Product added successfully');
          setModalVisible(false);
          form.resetFields();
        } else {
          message.error(result.error || 'Failed to add product');
        }
      }
    } catch (error) {
      message.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    message.success("Logged out successfully");
    router.push('/admin/login');
  };

  // Responsive columns for different screen sizes
  const getColumns = () => {
    const baseColumns = [
      {
        title: 'Image',
        key: 'image',
        width: 80,
        render: (_, record) => (
          <Image
            src={record.image}
            alt={record.name}
            width={60}
            height={60}
            style={{ objectFit: 'cover' }}
            preview={false}
          />
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        responsive: ['xl'],
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        filters: [...new Set(products.map(p => p.category))].map(cat => ({ text: cat, value: cat })),
        onFilter: (value, record) => record.category === value,
        responsive: ['xl'],
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price) => `₹${price.toLocaleString()}`,
        sorter: (a, b) => a.price - b.price,
        responsive: ['xl'],
      },
      {
        title: 'Stock',
        dataIndex: 'inStock',
        key: 'inStock',
        width: 80,
        render: (inStock) => (
          <Switch checked={inStock} disabled size="small" />
        ),
        responsive: ['xl'],
      },
      {
        title: 'Featured',
        dataIndex: 'featured',
        key: 'featured',
        width: 80,
        render: (featured) => (
          <Switch checked={featured} disabled size="small" />
        ),
        responsive: ['xl'],
      },
      {
        title: 'Actions',
        key: 'actions',
        width: 120,
        render: (_, record) => (
          <Space size="small" direction="vertical">
            <Button
              type="default"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditProduct(record)}
              className="border-blue-200 text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 w-full"
            >
              <span className="hidden sm:inline">Edit</span>
            </Button>
            <Popconfirm
              title="Delete this product?"
              onConfirm={() => handleDeleteProduct(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="default"
                icon={<DeleteOutlined />}
                size="small"
                className="border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 transition-all duration-200 w-full"
              >
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    return baseColumns;
  };

  // Mobile-friendly product card
  const renderMobileProductCard = (product) => (
    <Card 
      key={product.id} 
      className="mb-4 shadow-sm hover:shadow-md transition-shadow duration-200 mobile-product-card admin-card"
      bodyStyle={{ padding: '16px' }}
    >
      <div className="flex items-start space-x-3">
        <Image
          src={product.image}
          alt={product.name}
          width={80}
          height={80}
          style={{ objectFit: 'cover' }}
          preview={false}
          className="rounded-lg"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <p className="text-lg font-bold text-red-600">₹{product.price.toLocaleString()}</p>
            </div>
            <div className="flex flex-col items-end space-y-2 ml-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Stock:</span>
                <Switch checked={product.inStock} disabled size="small" />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">Featured:</span>
                <Switch checked={product.featured} disabled size="small" />
              </div>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <Button
              type="default"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditProduct(product)}
              className="border-blue-200 text-blue-600 hover:border-blue-300 hover:bg-blue-50 flex-1"
            >
              Edit
            </Button>
            <Popconfirm
              title="Delete this product?"
              onConfirm={() => handleDeleteProduct(product.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="default"
                icon={<DeleteOutlined />}
                size="small"
                className="border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 flex-1"
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b admin-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-600">
                Jm <span className="text-gray-800">Novelties</span>
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Text className="text-gray-600 hidden sm:block">Firebase Admin Panel</Text>
              <Button
                type="default"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                className="border-gray-300 text-gray-700 hover:border-gray-400"
                size="small"
              >
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 admin-container">
        {/* Back to Home Button */}
        <div className="mb-4 sm:mb-6">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => router.push('/')}
            className="border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
            size="small"
          >
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <Title level={2} className="text-gray-800 text-xl sm:text-2xl lg:text-3xl !mb-0 admin-title">
            Firebase Product Management
          </Title>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={fetchProducts}
              loading={loading}
            >
              Refresh
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </Space>
        </div>

        <Card className="admin-section">
          {/* Desktop Table View */}
          <div className="hidden xl:block">
            <Table
              columns={getColumns()}
              dataSource={products}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                responsive: true,
                size: 'default',
              }}
              scroll={{ x: 800 }}
            />
          </div>

          {/* Mobile Card View */}
          <div className="xl:hidden">
            {loading ? (
              <div className="text-center py-8 admin-loading">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-8 admin-empty">
                <p className="text-gray-600">No products found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map(renderMobileProductCard)}
              </div>
            )}
          </div>
        </Card>

        <Modal
          title={editingProduct ? 'Edit Product' : 'Add Product'}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width="90vw"
          style={{ maxWidth: '600px' }}
          className="admin-modal"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              inStock: true,
              featured: false,
            }}
            className="admin-form"
          >
            <Row gutter={[16, 16]} className="admin-form-row">
              <Col xs={24} sm={24} className="admin-form-col">
                <Form.Item
                  name="name"
                  label="Product Name"
                  rules={[{ required: true, message: 'Please enter product name' }]}
                >
                  <Input placeholder="Enter product name" />
                </Form.Item>
              </Col>
              
              <Col xs={24} sm={12} className="admin-form-col">
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: true, message: 'Please select category' }]}
                >
                  <Select placeholder="Select category">
                    <Option value="Gift Sets">Gift Sets</Option>
                    <Option value="Accessories">Accessories</Option>
                    <Option value="Beauty">Beauty</Option>
                    <Option value="Food & Beverages">Food & Beverages</Option>
                    <Option value="Home & Garden">Home & Garden</Option>
                    <Option value="Electronics">Electronics</Option>
                    <Option value="Books">Books</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} className="admin-form-col">
                <Form.Item
                  name="price"
                  label="Price (₹)"
                  rules={[{ required: true, message: 'Please enter price' }]}
                >
                  <InputNumber
                    placeholder="Enter price"
                    min={0}
                    style={{ width: '100%' }}
                    formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/₹\s?|(,*)/g, '')}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} className="admin-form-col">
                <Form.Item
                  name="image"
                  label="Image URL"
                  rules={[{ required: true, message: 'Please enter image URL' }]}
                >
                  <Input placeholder="Enter image URL" />
                </Form.Item>
              </Col>

              <Col xs={24} className="admin-form-col">
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: 'Please enter description' }]}
                >
                  <TextArea rows={3} placeholder="Enter product description" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} className="admin-form-col">
                <Form.Item
                  name="inStock"
                  label="In Stock"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12} className="admin-form-col">
                <Form.Item
                  name="featured"
                  label="Featured Product"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>

            <Divider />

            <Form.Item className="text-center !mb-0">
              <Space size="middle" wrap>
                <Button onClick={() => setModalVisible(false)} disabled={submitting}>
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  loading={submitting}
                  disabled={submitting}
                >
                  {editingProduct ? 'Update' : 'Add'} Product
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </main>
    </div>
  );
};

export default AdminPage;
