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
  Spin,
  Tabs,
} from "antd";

import {
  ShoppingCartOutlined,
  SearchOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  ShoppingOutlined,
  WhatsAppOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer.jsx";
import { useProducts } from "@/hooks/useProducts";
import { useInquiries } from "@/hooks/useInquiries";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

const GiftHomePage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use custom hooks for products and inquiries
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts();
  const {
    submitInquiry,
    loading: inquiryLoading,
    error: inquiryError,
  } = useInquiries();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get unique categories from products
  const categories = [
    "all",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const toggleMobileSearch = () => {
    setMobileSearchVisible(!mobileSearchVisible);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-red-600">
                Jm <span className="text-gray-800">Novelties</span>
              </h1>
            </div>

            {/* Desktop Search Bar - Hidden on Mobile */}
            {!isMobile && (
              <div className="flex-1 max-w-md mx-8">
                <Search
                  placeholder="Search products..."
                  allowClear
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                  size="large"
                  enterButton
                />
              </div>
            )}

            {/* Mobile Search Toggle and Cart */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile Search Toggle */}
              {isMobile && (
                <Button
                  type="text"
                  icon={<SearchOutlined />}
                  onClick={toggleMobileSearch}
                  className="p-2 mobile-search-toggle"
                  size="large"
                />
              )}

              {/* Cart Button */}
              <Badge count={getTotalItems()} showZero={false}>
                <Button
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => setCartVisible(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                  size={isMobile ? "middle" : "large"}
                >
                  {!isMobile && "Cart"}
                </Button>
              </Badge>
            </div>
          </div>

          {/* Mobile Search Bar - Appears below header when toggled */}
          {isMobile && mobileSearchVisible && (
            <div className="mt-4">
              <Search
                placeholder="Search products..."
                allowClear
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                size="large"
                enterButton
                onSearch={() => setMobileSearchVisible(false)}
              />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-8">
        {/* Carousel Section */}
        <div className="mb-8 sm:mb-12">
          <Carousel
            autoplay
            dots={{ position: "bottom" }}
            effect="fade"
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <div>
              <div className="relative h-64 sm:h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/g1.webp"
                  alt="Premium Gift Collection"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80"></div>
                <div className="relative z-10 text-center text-white px-4">
                  <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">
                    Premium Gift Collection
                  </h2>
                  <p className="text-sm sm:text-xl md:text-2xl mb-4 sm:mb-6">
                    Discover our exclusive range of luxury gifts
                  </p>
                  <Button
                    type="primary"
                    size={isMobile ? "middle" : "large"}
                    className="bg-white text-blue-600 hover:bg-gray-100 h-10 sm:h-12 px-4 sm:px-8 text-base sm:text-lg"
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
              <div className="relative h-64 sm:h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/g2.png"
                  alt="Custom Engraving"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/80 to-teal-500/80"></div>
                <div className="relative z-10 text-center text-white px-4">
                  <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">
                    Custom Engraving
                  </h2>
                  <p className="text-sm sm:text-xl md:text-2xl mb-4 sm:mb-6">
                    Personalize your gifts with custom messages
                  </p>
                  <Button
                    type="primary"
                    size={isMobile ? "middle" : "large"}
                    className="bg-white text-green-600 hover:bg-gray-100 h-10 sm:h-12 px-4 sm:px-8 text-base sm:text-lg"
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
              <div className="relative h-64 sm:h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/g3.png"
                  alt="Corporate Gifting"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/80 to-pink-500/80"></div>
                <div className="relative z-10 text-center text-white px-4">
                  <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">
                    Corporate Gifting
                  </h2>
                  <p className="text-sm sm:text-xl md:text-2xl mb-4 sm:mb-6">
                    Perfect gifts for your business partners
                  </p>
                  <Button
                    type="primary"
                    size={isMobile ? "middle" : "large"}
                    className="bg-white text-red-600 hover:bg-gray-100 h-10 sm:h-12 px-4 sm:px-8 text-base sm:text-lg"
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
              <div className="relative h-64 sm:h-96 flex items-center justify-center overflow-hidden">
                <img
                  src="/g5.png"
                  alt="Special Occasions"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/80 to-orange-500/80"></div>
                <div className="relative z-10 text-center text-white px-4">
                  <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">
                    Special Occasions
                  </h2>
                  <p className="text-sm sm:text-xl md:text-2xl mb-4 sm:mb-6">
                    Celebrate life&apos;s precious moments with us
                  </p>
                  <Button
                    type="primary"
                    size={isMobile ? "middle" : "large"}
                    className="bg-white text-orange-600 hover:bg-gray-100 h-10 sm:h-12 px-4 sm:px-8 text-base sm:text-lg"
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
        <div className="text-center mb-8 sm:mb-12 px-4">
          <Title level={1} className="text-2xl sm:text-4xl md:text-6xl text-gray-800 mb-2 sm:mb-4">
            Discover Amazing Gifts
          </Title>
          <Paragraph className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of premium gifts and novelties.
            Perfect for every occasion and every special someone.
          </Paragraph>
        </div>

        {/* Category Menu */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8 sm:mb-12 category-menu-container">
          <div className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
              Shop by Category
            </h3>

            {/* Category Quick Access Menu */}
            <div className="overflow-x-auto category-quick-access">
              <div className="flex space-x-2 sm:space-x-3 pb-2 min-w-max gap-1 sm:gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    type={selectedCategory === category ? "primary" : "default"}
                    size={isMobile ? "small" : "middle"}
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap text-xs sm:text-sm"
                  >
                    {category === "all" ? "All Products" : category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div id="products-section" className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
            <Title level={2} className="text-xl sm:text-2xl text-gray-800 mb-0">
              {selectedCategory === "all"
                ? "All Products"
                : `${selectedCategory} Products`}
            </Title>
            <div className="product-count text-sm sm:text-base text-gray-600">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} found
            </div>
          </div>

          {productsLoading ? (
            <div className="text-center py-12">
              <Spin size="large" />
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : productsError ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{productsError}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Empty
                className="enhanced-empty"
                description={
                  <div>
                    <p className="text-gray-600 mb-2">No products found</p>
                    {selectedCategory !== "all" && (
                      <Button
                        type="primary"
                        onClick={() => setSelectedCategory("all")}
                        className="mt-2"
                      >
                        View All Products
                      </Button>
                    )}
                  </div>
                }
              />
            </div>
          ) : (
            <Row gutter={[16, 16]} className="sm:gutter-[24px]">
              {filteredProducts.map((product) => (
                <Col xs={24} sm={12} md={8} lg={8} xl={6} key={product.id}>
                  <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 h-full">
                    {/* Product Image Container */}
                    <div className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                      <img
                        alt={product.name}
                        src={product.image}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Premium Badge */}
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                        <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md">
                          Premium
                        </span>
                      </div>
                      {/* Category Badge */}
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                        <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-700 shadow-md">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    {/* Product Content */}
                    <div className="p-3 sm:p-4 flex flex-col min-h-40 sm:min-h-48">
                      {/* Product Title */}
                      <div className="mb-2 sm:mb-3">
                        <h3 className="text-sm sm:text-base font-bold text-gray-800 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                          {product.name}
                        </h3>
                      </div>

                      {/* Product Description */}
                      <div className="mb-3 sm:mb-4 flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      {/* Price and Action Section */}
                      <div className="mt-auto pt-2">
                        {/* Price */}
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className="flex items-baseline space-x-1 sm:space-x-2">
                            <span className="text-base sm:text-lg font-bold text-blue-600">
                              ₹{product.price.toLocaleString()}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-400 line-through">
                              ₹{(product.price * 1.15).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-green-600 font-semibold bg-green-50 px-1 sm:px-2 py-1 rounded-full">
                            Save 15%
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => addToCart(product)}
                          className="w-full h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-white text-sm sm:text-base"
                          size={isMobile ? "middle" : "large"}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    {/* Premium Features Indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </main>

      {/* Cart Drawer */}
      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={() => setCartVisible(false)}
        open={cartVisible}
        width={isMobile ? "100%" : 400}
        footer={
          <div className="space-y-4">
            <Divider />
            <div className="flex justify-between items-center text-base sm:text-lg font-bold">
              <span>Total:</span>
              <span className="text-blue-600">
                ₹{getTotalPrice().toLocaleString()}
              </span>
            </div>
            <Button
              type="primary"
              size={isMobile ? "middle" : "large"}
              icon={<ShoppingOutlined />}
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className="w-full bg-green-600 hover:bg-green-700 h-10 sm:h-12"
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
              <List.Item key={item.id} className="px-0">
                <div className="flex items-center space-x-2 sm:space-x-3 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <Text strong className="block text-sm sm:text-base truncate">
                      {item.name}
                    </Text>
                    <Text className="text-gray-600 text-xs sm:text-sm">
                      ₹{item.price.toLocaleString()}
                    </Text>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 gap-1 sm:gap-2">
                    <Button
                      size={isMobile ? "small" : "small"}
                      icon={<MinusOutlined />}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    />
                    <span className="w-6 sm:w-8 text-center text-xs sm:text-sm">{item.quantity}</span>
                    <Button
                      size={isMobile ? "small" : "small"}
                      icon={<PlusOutlined />}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    />
                    <Button
                      size={isMobile ? "small" : "small"}
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
        width={isMobile ? "95%" : 800}
        destroyOnClose
      >
        <div className="space-y-6">
          {/* Cart Summary */}
          <Card title="Order Summary" size="small">
            <List
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item key={item.id} className="px-0">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                      />
                      <div>
                        <Text strong className="text-sm sm:text-base">{item.name}</Text>
                        <Text className="block text-gray-600 text-xs sm:text-sm">
                          Qty: {item.quantity}
                        </Text>
                      </div>
                    </div>
                    <Text strong className="text-sm sm:text-base">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </Text>
                  </div>
                </List.Item>
              )}
            />
            <Divider />
            <div className="flex justify-between items-center text-base sm:text-lg font-bold">
              <span>Total Amount:</span>
              <span className="text-blue-600">
                ₹{getTotalPrice().toLocaleString()}
              </span>
            </div>
          </Card>

          {/* Inquiry Form */}
          <CheckoutForm cartItems={cartItems} totalAmount={getTotalPrice()} isMobile={isMobile} />
        </div>
      </Modal>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Checkout Form Component
const CheckoutForm = ({ cartItems, totalAmount, isMobile }) => {
  const [form] = Form.useForm();
  const { submitInquiry, loading, error } = useInquiries();

  const onFinish = async (values) => {
    try {
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

      const result = await submitInquiry(inquiryData);

      if (result.success) {
        message.success(
          "Inquiry submitted successfully! Redirecting to WhatsApp..."
        );
        form.resetFields();

        // Prepare WhatsApp message
        const whatsappMessage = prepareWhatsAppMessage(
          values,
          inquiryData.cartItems,
          totalAmount
        );

        // Redirect to WhatsApp
        redirectToWhatsApp(whatsappMessage);

        // Close modal and clear cart after a short delay
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        message.error(
          result.error || "Failed to submit inquiry. Please try again."
        );
      }
    } catch (error) {
      message.error("Failed to submit inquiry. Please try again.");
    }
  };

  const prepareWhatsAppMessage = (customerInfo, items, total) => {
    const orderDetails = items
      .map(
        (item) =>
          `• ${item.productName} (Qty: ${item.quantity
          }) - ₹${item.price.toLocaleString()}`
      )
      .join("\n");

    const message = `Hello! I would like to place an order for the following items:

${orderDetails}

Total Amount: ₹${total.toLocaleString()}

Customer Details:
Name: ${customerInfo.firstName} ${customerInfo.lastName}
Phone: ${customerInfo.phone}
Email: ${customerInfo.email}
${customerInfo.company ? `Company: ${customerInfo.company}` : ""}
Address: ${customerInfo.address}
${customerInfo.additionalNotes
        ? `Additional Notes: ${customerInfo.additionalNotes}`
        : ""
      }

Please confirm my order and provide payment details. Thank you!`;

    return encodeURIComponent(message);
  };

  const redirectToWhatsApp = (message) => {
    // You can change this phone number to your business WhatsApp number
    const phoneNumber = "9354382722"; // Replace with your actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card title="Your Information" size="small">
      <Form form={form} layout="vertical" onFinish={onFinish} size={isMobile ? "middle" : "large"}>
        <Row gutter={isMobile ? 0 : 16}>
          <Col xs={24} sm={12}>
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
          <Col xs={24} sm={12}>
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

        <Row gutter={isMobile ? 0 : 16}>
          <Col xs={24} sm={12}>
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
          <Col xs={24} sm={12}>
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
          <div className="space-y-3">
            <div className="text-xs sm:text-sm text-gray-600 bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
              <WhatsAppOutlined className="text-green-600 mr-2" />
              After submitting, you&apos;ll be redirected to WhatsApp to
              complete your order with our team.
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size={isMobile ? "middle" : "large"}
              className="bg-green-600 hover:bg-green-700 h-10 sm:h-12 px-4 sm:px-8 text-base sm:text-lg"
            >
              Submit Inquiry & Continue on WhatsApp
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default GiftHomePage;
