"use client";

import React, { useState, useEffect } from "react";
import { 
  Form, 
  Input, 
  Button, 
  Select, 
  message, 
  Card, 
  Row, 
  Col, 
  Typography, 
  Table,
  Popconfirm,
  Space,
  Upload,
  Modal
} from "antd";

import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UploadOutlined,
  ArrowLeftOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const AdminPage = () => {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      message.error("Please login to access admin panel");
      router.push('/admin/login');
      return;
    }
  }, [router]);

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('giftProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Set default products if none exist
      const defaultProducts = [
        {
          id: 1,
          name: "Premium Gift Box Set",
          category: "Gift Sets",
          price: 2999,
          image: "/g1.webp",
          description: "Elegant gift box containing premium items perfect for special occasions."
        },
        {
          id: 2,
          name: "Custom Engraved Watch",
          category: "Accessories",
          price: 4999,
          image: "/g2.png",
          description: "Personalized watch with custom engraving for a unique gift."
        },
        {
          id: 3,
          name: "Luxury Perfume Collection",
          category: "Beauty",
          price: 3999,
          image: "/g3.png",
          description: "Exclusive collection of luxury fragrances in elegant packaging."
        },
        {
          id: 4,
          name: "Artisan Chocolate Box",
          category: "Food & Beverages",
          price: 1499,
          image: "/g4.png",
          description: "Handcrafted chocolates in a beautiful presentation box."
        },
        {
          id: 5,
          name: "Personalized Photo Frame",
          category: "Home & Garden",
          price: 1999,
          image: "/g5.png",
          description: "Custom photo frame with personal message and design."
        },
        {
          id: 6,
          name: "Premium Tea Set",
          category: "Home & Garden",
          price: 3499,
          image: "/g6.png",
          description: "Elegant tea set perfect for tea lovers and collectors."
        }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('giftProducts', JSON.stringify(defaultProducts));
    }
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Form submitted with values:", values);
      
      const newProduct = {
        id: editingProduct ? editingProduct.id : Date.now(),
        ...values,
        price: parseInt(values.price)
      };

      console.log("New product object:", newProduct);

      if (editingProduct) {
        // Update existing product
        const updatedProducts = products.map(p => 
          p.id === editingProduct.id ? newProduct : p
        );
        setProducts(updatedProducts);
        localStorage.setItem('giftProducts', JSON.stringify(updatedProducts));
        console.log("Product updated, showing success message");
        message.success("Product updated successfully!");
      } else {
        // Add new product
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        localStorage.setItem('giftProducts', JSON.stringify(updatedProducts));
        console.log("Product added, showing success message");
        message.success("Product added successfully!");
      }

      form.resetFields();
      setEditingProduct(null);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error in onFinish:", error);
      message.error("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('giftProducts', JSON.stringify(updatedProducts));
    message.success("Product deleted successfully!");
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    message.success("Logged out successfully");
    router.push('/admin/login');
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img 
          src={image} 
          alt="Product" 
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <Text className="text-green-600 font-bold">₹{price.toLocaleString()}</Text>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <Text className="text-gray-600">{text.substring(0, 50)}...</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
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
              <Button 
                icon={<ArrowLeftOutlined />} 
                onClick={() => router.push('/')}
                className="mr-4"
              >
                Back to Home
              </Button>
              <h1 className="text-3xl font-bold text-red-600">
                Jm <span className="text-gray-800">Novelties</span>
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Text className="text-gray-600">Admin Panel</Text>
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
        <div className="flex justify-between items-center mb-8">
          <Title level={2} className="text-gray-800">
            Product Management
          </Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleAddNew}
            className="bg-green-600 hover:bg-green-700"
          >
            Add New Product
          </Button>
        </div>

        {/* Products Table */}
        <Card className="shadow-lg">
          <Table
            columns={columns}
            dataSource={products}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} products`
            }}
          />
        </Card>
      </main>

      {/* Add/Edit Product Modal */}
      <Modal
        title={editingProduct ? "Edit Product" : "Add New Product"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingProduct(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Product Name"
                rules={[{ required: true, message: "Please enter product name" }]}
              >
                <Input placeholder="Enter product name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Product Category"
                rules={[{ required: true, message: "Please select product category" }]}
              >
                <Select placeholder="Select category">
                  <Option value="Gift Sets">Gift Sets</Option>
                  <Option value="Accessories">Accessories</Option>
                  <Option value="Beauty">Beauty</Option>
                  <Option value="Food & Beverages">Food & Beverages</Option>
                  <Option value="Home & Garden">Home & Garden</Option>
                  <Option value="Electronics">Electronics</Option>
                  <Option value="Clothing">Clothing</Option>
                  <Option value="Toys & Games">Toys & Games</Option>
                  <Option value="Sports & Outdoors">Sports & Outdoors</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="price"
            label="Price (₹)"
            rules={[{ required: true, message: "Please enter product price" }]}
          >
            <Input type="number" placeholder="Enter price" min={0} />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: "Please enter image URL" }]}
          >
            <Input placeholder="Enter image URL (e.g., /g1.webp)" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Product Description"
            rules={[{ required: true, message: "Please describe the product" }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Describe the product..."
            />
          </Form.Item>

          <Form.Item className="text-center">
            <Space>
              <Button 
                onClick={() => {
                  setIsModalVisible(false);
                  setEditingProduct(null);
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingProduct ? "Update Product" : "Add Product"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPage;
