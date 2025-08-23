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
  Typography
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

  const handleSeedDatabase = async () => {
    setSeeding(true);
    try {
      const success = await seedDatabase();
      if (success) {
        message.success('Database seeded successfully!');
        await fetchProducts();
      } else {
        message.error('Failed to seed database');
      }
    } catch (error) {
      message.error('Error seeding database');
    } finally {
      setSeeding(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    message.success("Logged out successfully");
    router.push('/admin/login');
  };

  const columns = [
    {
      title: 'Image',
      key: 'image',
      render: (_, record) => (
        <Image
          src={record.image}
          alt={record.name}
          width={60}
          height={60}
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [...new Set(products.map(p => p.category))].map(cat => ({ text: cat, value: cat })),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price.toLocaleString()}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'In Stock',
      dataIndex: 'inStock',
      key: 'inStock',
      render: (inStock) => (
        <Switch checked={inStock} disabled />
      ),
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      render: (featured) => (
        <Switch checked={featured} disabled />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="default"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEditProduct(record)}
            className="border-blue-200 text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="default"
              icon={<DeleteOutlined />}
              size="small"
              className="border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-red-600">
                Jm <span className="text-gray-800">Novelties</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Text className="text-gray-600">Firebase Admin Panel</Text>
              <Button
                type="default"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                className="border-gray-300 text-gray-700 hover:border-gray-400"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={() => router.push('/')}
            className="border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
          >
            Back to Home
          </Button>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <Title level={2} className="text-gray-800">
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
            <Button
              onClick={handleSeedDatabase}
              loading={seeding}
            >
              Seed Database
            </Button>
          </Space>
        </div>

        <Card>
          <Table
            columns={columns}
            dataSource={products}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />
        </Card>

        <Modal
          title={editingProduct ? 'Edit Product' : 'Add Product'}
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={600}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              inStock: true,
              featured: false,
            }}
          >
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: 'Please enter product name' }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>

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

            <Form.Item
              name="image"
              label="Image URL"
              rules={[{ required: true, message: 'Please enter image URL' }]}
            >
              <Input placeholder="Enter image URL" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <TextArea rows={3} placeholder="Enter product description" />
            </Form.Item>

            <Form.Item
              name="inStock"
              label="In Stock"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="featured"
              label="Featured Product"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item className="text-center">
              <Space>
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
