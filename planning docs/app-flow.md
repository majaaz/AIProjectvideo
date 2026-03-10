Project: NovaCart Ecommerce Platform

Prepared For: Mohammed Majaaz
Version: 1.0
Date: March 2026

1. Application Overview

NovaCart is a modern ecommerce platform supporting two types of users:

Buyers

Sellers

The platform provides:

Product browsing

Product management

Cart and checkout

Secure payments

AI chatbot support

Live customer service

The application will be built using:

NextJS (frontend + API routes)

Supabase (database + auth)

Stripe (payments)

ThreeJS (3D product viewer)

2. High-Level Application Flow
Landing Page
      │
      │
Authentication
      │
      │
Select Role
 │           │
Buyer       Seller
 │           │
Browse      Seller Dashboard
Products
 │
Product Page
 │
Add to Cart
 │
Cart Page
 │
Checkout
 │
Payment
 │
Order Confirmation

Chatbot support is available throughout the entire application.

3. Landing Page Flow
Page: /

Purpose:
Introduce the ecommerce platform and guide users toward shopping or selling.

Sections:

Navigation bar

Featured products

Category highlights

3D interactive product showcase

Call to action buttons

Actions available:

Browse Products
Login
Sign Up
Become a Seller

Flow:

Landing Page
   │
   ├── Browse Products
   │
   └── Login / Signup
4. Authentication Flow
Page: /login

Users can authenticate using:

Google login

Email/password

Flow:

User clicks Login
       │
Choose login method
       │
Google OAuth or Email Login
       │
User authenticated
       │
Redirect to role selection
5. Role Selection Flow
Page: /choose-role

User selects:

Buyer
Seller

Flow:

Login
   │
Choose Role
   │
   ├── Buyer → Buyer Home
   │
   └── Seller → Seller Dashboard

Role is stored in database.

6. Buyer App Flow
6.1 Buyer Home
Page: /home

Purpose:

Product discovery.

Sections:

search bar

product categories

recommended products

trending products

promotional banners

Flow:

Buyer Home
   │
Search
   │
Product Listing
6.2 Product Listing Page
Page: /products

Shows:

all products

filters

categories

Filters:

Price
Category
Rating
Availability

Flow:

Product Listing
     │
Select Product
     │
Product Details
6.3 Product Detail Flow
Page: /product/[id]

Displays:

product images

3D viewer

description

reviews

price

add to cart

Flow:

Product Page
   │
Add to Cart
   │
Cart Updated

Alternative:

Buy Now
   │
Checkout
6.4 Cart Flow
Page: /cart

Displays:

items added

quantity selector

item price

total price

Actions:

Update quantity
Remove item
Proceed to checkout

Flow:

Cart
  │
Proceed to Checkout
6.5 Checkout Flow
Page: /checkout

Sections:

shipping address

order summary

payment method

Flow:

Checkout
   │
Enter Shipping Info
   │
Confirm Order
   │
Proceed to Payment
6.6 Payment Flow
Page: /payment

Handled by Stripe.

Flow:

Stripe Payment
    │
Payment success
    │
Order created

If payment fails:

Payment failed
    │
Retry payment
6.7 Order Confirmation
Page: /order-success

Displays:

order ID

items purchased

estimated delivery

Options:

Track order
Continue shopping
7. Seller App Flow
7.1 Seller Dashboard
Page: /seller/dashboard

Displays:

sales summary

total products

orders

revenue

Actions:

Add product
Manage products
View orders
7.2 Add Product Flow
Page: /seller/add-product

Seller enters:

Product name
Category
Price
Description
Images
Stock quantity
3D model (optional)

Flow:

Add Product
   │
Submit
   │
Product saved to database
7.3 Manage Products Flow
Page: /seller/products

Displays:

Seller's products.

Options:

Edit
Delete
View product

Flow:

Seller Products
   │
Edit Product
7.4 Edit Product Flow
Page: /seller/edit-product/[id]

Seller can update:

price

description

images

stock

Flow:

Edit Product
   │
Save Changes
   │
Database updated
7.5 Delete Product Flow

Flow:

Seller clicks Delete
   │
Confirmation modal
   │
Product removed
8. Chatbot Flow

Chatbot is available on every page.

Chat Button

Floating widget bottom-right.

Flow:

User opens chat
      │
AI chatbot responds
      │
User asks question

Possible topics:

product information

order tracking

payment issues

9. Live Agent Flow

If AI cannot resolve issue:

User clicks "Talk to Agent"
       │
Conversation escalated
       │
Agent joins chat

Agent dashboard shows:

user profile

order history

chat history

10. Search Flow

Search available globally.

Flow:

User types query
    │
Product search
    │
Search results

Example:

gaming laptop
nike shoes
iphone
11. Navigation Flow

Main navigation:

Home
Products
Categories
Cart
Orders
Profile

Seller navigation:

Dashboard
Products
Orders
Analytics
12. Error Handling Flow

Examples:

Product Out of Stock
Add to Cart
   │
Stock check
   │
Out of stock message
Payment Failure
Payment declined
   │
Retry payment
13. Logout Flow

User selects logout.

Flow:

Logout
   │
Session destroyed
   │
Redirect to landing page
14. App Navigation Map
Landing Page
   │
Login
   │
Role Selection
   │
 ┌───────────────┐
 │               │
Buyer         Seller
 │               │
Home         Dashboard
 │               │
Products     Manage Products
 │               │
Product Page  Add Product
 │
Cart
 │
Checkout
 │
Payment
 │
Order Confirmation
15. Global Components

These appear across the app:

Navbar

Chat widget

Footer

Notifications

Loading indicators

16. Mobile Flow

Mobile UX includes:

swipe product cards

gesture-based interactions

sensor-driven 3D rotation

17. Performance Flow

To ensure smooth UX:

lazy loading products

skeleton loading states

optimized images

18. Future App Flow Extensions

Possible future flows:

wishlist

subscriptions

seller analytics

delivery tracking

AI product recommendations