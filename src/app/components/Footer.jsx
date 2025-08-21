import React from "react";
import { Typography } from "antd";
import {
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    WhatsAppOutlined,
    FacebookOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    PinterestOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            {/* Upper Section - Four Columns */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* PARTNERSHIP Column */}
                    <div>
                        <Title level={4} className="!text-white mb-4 border-b !border-white pb-2">
                            PARTNERSHIP
                        </Title>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Agents and Partners
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Available Downloads
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* CUSTOMER CARE Column */}
                    <div>
                        <Title level={4} className="!text-white mb-4 border-b border-white pb-2">
                            CUSTOMER CARE
                        </Title>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Terms and Conditions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Mode of payment
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Privacy statement
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Store Locations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* MY ACCOUNT Column */}
                    <div>
                        <Title level={4} className="!text-white mb-4 border-b border-white pb-2">
                            MY ACCOUNT
                        </Title>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    My Account
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Wishlist
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                    Need Help
                                </a>
                            </li>
                            <li>
                                <a href="/admin/login" className="text-gray-300 hover:text-white transition-colors text-xs">
                                    Admin Access
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* CONTACT INFORMATION Column */}
                    <div>
                        <Title level={4} className="!text-white mb-4 border-b border-white pb-2">
                            CONTACT INFORMATION
                        </Title>
                        <div className="space-y-3">
                            <div className="flex items-start space-x-3">
                                <EnvironmentOutlined className="text-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <Text className="!text-gray-300 block">2545, Main Mahavir Bazar</Text>
                                    <Text className="!text-gray-300 block">Teliwara, Sadar Bazaar, New Delhi</Text>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <PhoneOutlined className="text-gray-400" />
                                <Text className="!text-gray-300">+91-89296 00009</Text>
                            </div>

                            <div className="flex items-center space-x-3">
                                <MailOutlined className="text-gray-400" />
                                <Text className="!text-gray-300">jmnovelties@gmail.com</Text>

                            </div>
                        </div>

                        {/* Social Media Icons */}
                        <div className="mt-6 flex space-x-4">
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                                <FacebookOutlined className="text-white" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                                <TwitterOutlined className="text-white" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                                <LinkedinOutlined className="text-white" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors">
                                <PinterestOutlined className="text-white" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lower Section */}
            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">

                        {/* Disclaimer */}
                        <div className="text-center lg:text-left lg:w-1/3">
                            <Text className="!text-gray-400 text-sm">
                                Note: The name appearing on the products do not represent that the products are manufactured for or by the said company. These are only for our identification.
                            </Text>
                        </div>

                        {/* Company Logo */}


                        {/* Copyright */}
                        <div className="lg:w-1/3 text-center lg:text-right">
                            <Text className="!text-gray-400 text-sm">
                                Copyright 2004-2020 Jm Novelties. All rights reserved.
                            </Text>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating WhatsApp Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <a
                    href="https://wa.me/918929600009"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
                >
                    <WhatsAppOutlined className="text-white text-2xl" />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
