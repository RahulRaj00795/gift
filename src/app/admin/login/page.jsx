"use client";

import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

const AdminLoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Check if the password matches admin@123
      if (values.password === "admin@123") {
        // Set authentication in localStorage
        localStorage.setItem('adminAuthenticated', 'true');
        message.success("Login successful! Redirecting to admin panel...");
        
        // Redirect to admin panel after a short delay
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
      } else {
        message.error("Invalid password. Please try again.");
      }
    } catch (error) {
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0">
          <div className="text-center mb-8">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-red-600">
                Jm <span className="text-gray-800">Novelties</span>
              </h1>
            </div>
            <Title level={2} className="text-gray-800 mb-2">
              Admin Login
            </Title>
            <Text className="text-gray-600">
              Enter your credentials to access the admin panel
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            size="large"
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter username"
                className="h-12"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter password"
                className="h-12"
              />
            </Form.Item>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-semibold"
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-6">
            <Text className="text-gray-500 text-sm">
              Default password: admin@123
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;

