"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Badge,
  Row,
  Col,
  Typography,
  Input,
  Space,
  Modal,
  message,
  Drawer,
  List,
  Divider,
  Empty,
  Form,
  Carousel,
} from "antd";

import {
  ShoppingCartOutlined,
  SearchOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer.jsx";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

const GiftHomePage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Product data from localStorage
  const [products, setProducts] = useState([]);

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("giftProducts");
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
          description:
            "Elegant gift box containing premium items perfect for special occasions.",
        },
        {
          id: 2,
          name: "Custom Engraved Watch",
          category: "Accessories",
          price: 4999,
          image: "/g2.png",
          description:
            "Personalized watch with custom engraving for a unique gift.",
        },
        {
          id: 3,
          name: "Luxury Perfume Collection",
          category: "Beauty",
          price: 3999,
          image: "/g3.png",
          description:
            "Exclusive collection of luxury fragrances in elegant packaging.",
        },
        {
          id: 4,
          name: "Artisan Chocolate Box",
          category: "Food & Beverages",
          price: 1499,
          image: "/g4.png",
          description:
            "Handcrafted chocolates in a beautiful presentation box.",
        },
        {
          id: 5,
          name: "Personalized Photo Frame",
          category: "Home & Garden",
          price: 1999,
          image: "/g5.png",
          description: "Custom photo frame with personal message and design.",
        },
        {
          id: 6,
          name: "Premium Tea Set",
          category: "Home & Garden",
          price: 3499,
          image: "/g6.png",
          description: "Elegant tea set perfect for tea lovers and collectors.",
        },
      ];
      setProducts(defaultProducts);
      localStorage.setItem("giftProducts", JSON.stringify(defaultProducts));
    }
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    message.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
    message.success("Item removed from cart!");
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      message.warning("Your cart is empty!");
      return;
    }
    setCartVisible(false);
    setCheckoutVisible(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-red-600">
                Jm <span className="text-gray-800">Novelties</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <Search
                placeholder="Search products..."
                allowClear
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>

            {/* Cart Button */}
            <div className="flex items-center space-x-4">
              <Badge count={getTotalItems()} showZero={false}>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => setCartVisible(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Cart
                </Button>
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Carousel Section */}
        <div className="mb-12">
          <Carousel
            autoplay
            dots={{ position: "bottom" }}
            effect="fade"
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <div>
              <div className="relative h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/g1.webp"
                  alt="Premium Gift Collection"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80"></div>
                <div className="relative z-10 text-center text-white">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    Premium Gift Collection
                  </h2>
                  <p className="text-xl md:text-2xl mb-6">
                    Discover our exclusive range of luxury gifts
                  </p>
                  <Button
                    type="primary"
                    size="large"
                    className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-8 text-lg"
                    onClick={() =>
                      document
                        .getElementById("products-section")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Shop Now
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="relative h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/g2.png"
                  alt="Custom Engraving"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/80 to-teal-500/80"></div>
                <div className="relative z-10 text-center text-white">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    Custom Engraving
                  </h2>
                  <p className="text-xl md:text-2xl mb-6">
                    Personalize your gifts with custom messages
                  </p>
                  <Button
                    type="primary"
                    size="large"
                    className="bg-white text-green-600 hover:bg-gray-100 h-12 px-8 text-lg"
                    onClick={() =>
                      document
                        .getElementById("products-section")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="relative h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/g3.png"
                  alt="Corporate Gifting"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/80 to-pink-500/80"></div>
                <div className="relative z-10 text-center text-white">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    Corporate Gifting
                  </h2>
                  <p className="text-xl md:text-2xl mb-6">
                    Perfect gifts for your business partners
                  </p>
                  <Button
                    type="primary"
                    size="large"
                    className="bg-white text-red-600 hover:bg-gray-100 h-12 px-8 text-lg"
                    onClick={() =>
                      document
                        .getElementById("products-section")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <div className="relative h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/g5.png"
                  alt="Special Occasions"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/80 to-orange-500/80"></div>
                <div className="relative z-10 text-center text-white">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4">
                    Special Occasions
                  </h2>
                  <p className="text-xl md:text-2xl mb-6">
                    Celebrate life&apos;s precious moments with us
                  </p>
                  <Button
                    type="primary"
                    size="large"
                    className="bg-white text-orange-600 hover:bg-gray-100 h-12 px-8 text-lg"
                    onClick={() =>
                      document
                        .getElementById("products-section")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </Carousel>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <Title level={1} className="text-4xl md:text-6xl text-gray-800 mb-4">
            Discover Amazing Gifts
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of premium gifts and novelties.
            Perfect for every occasion and every special someone.
          </Paragraph>
        </div>

        {/* Products Grid */}
        <div id="products-section" className="mb-12">
          <Title level={2} className="text-2xl text-gray-800 mb-6">
            Our Products
          </Title>
          <Row gutter={[24, 24]}>
            {filteredProducts.map((product) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={product.id}>
                <Card
                  hoverable
                  className="h-full"
                  cover={
                    <div className="h-48 overflow-hidden">
                      <img
                        alt={product.name}
                        src={product.image}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  }
                  actions={[
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => addToCart(product)}
                      className="px-1"
                    >
                      Add to Cart
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={product.name}
                    description={
                      <div>
                        <Text className="text-gray-600 block mb-2">
                          {product.description}
                        </Text>
                        <div className="flex items-center justify-between">
                          <Text className="text-lg font-bold text-blue-600">
                            ₹{product.price.toLocaleString()}
                          </Text>
                          <Text className="text-sm text-gray-500">
                            {product.category}
                          </Text>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </main>

      {/* Cart Drawer */}
      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={() => setCartVisible(false)}
        open={cartVisible}
        width={400}
        footer={
          <div className="space-y-4">
            <Divider />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-blue-600">
                ₹{getTotalPrice().toLocaleString()}
              </span>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<ShoppingOutlined />}
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 h-12"
            >
              Proceed to Checkout
            </Button>
          </div>
        }
      >
        {cartItems.length === 0 ? (
          <Empty description="Your cart is empty" />
        ) : (
          <List
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item className="px-0">
                <div className="flex items-center space-x-3 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <Text strong className="block">
                      {item.name}
                    </Text>
                    <Text className="text-gray-600">
                      ₹{item.price.toLocaleString()}
                    </Text>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="small"
                      icon={<MinusOutlined />}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    />
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      size="small"
                      icon={<PlusOutlined />}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    />
                    <Button
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removeFromCart(item.id)}
                    />
                  </div>
                </div>
              </List.Item>
            )}
          />
        )}
      </Drawer>

      {/* Checkout Modal */}
      <Modal
        title="Complete Your Inquiry"
        open={checkoutVisible}
        onCancel={() => setCheckoutVisible(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <div className="space-y-6">
          {/* Cart Summary */}
          <Card title="Order Summary" size="small">
            <List
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item className="px-0">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <Text strong>{item.name}</Text>
                        <Text className="block text-gray-600">
                          Qty: {item.quantity}
                        </Text>
                      </div>
                    </div>
                    <Text strong>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </Text>
                  </div>
                </List.Item>
              )}
            />
            <Divider />
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-blue-600">
                ₹{getTotalPrice().toLocaleString()}
              </span>
            </div>
          </Card>

          {/* Inquiry Form */}
          <CheckoutForm cartItems={cartItems} totalAmount={getTotalPrice()} />
        </div>
      </Modal>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Checkout Form Component
const CheckoutForm = ({ cartItems, totalAmount }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Prepare inquiry data
      const inquiryData = {
        ...values,
        cartItems: cartItems.map((item) => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount,
        inquiryDate: new Date().toISOString(),
      };

      console.log("Inquiry submitted:", inquiryData);
      message.success(
        "Inquiry submitted successfully! We'll get back to you soon."
      );
      form.resetFields();

      // Close modal and clear cart
      window.location.reload(); // Simple way to reset everything
    } catch (error) {
      message.error("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Your Information" size="small">
      <Form form={form} layout="vertical" onFinish={onFinish} size="large">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="company" label="Company (Optional)">
          <Input placeholder="Enter company name" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please enter your address" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter your complete address" />
        </Form.Item>

        <Form.Item name="additionalNotes" label="Additional Notes (Optional)">
          <Input.TextArea
            rows={3}
            placeholder="Any special requirements or additional information..."
          />
        </Form.Item>

        <Form.Item className="text-center">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            className="bg-green-600 hover:bg-green-700 h-12 px-8 text-lg"
          >
            Submit Inquiry
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default GiftHomePage;
