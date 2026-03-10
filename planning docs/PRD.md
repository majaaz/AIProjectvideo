Product Requirement Document (PRD)
Project Name

NovaCart (placeholder name — you can change it)

Document Owner

Mohammed Majaaz

Version

1.0

Date

March 2026

1. Product Overview

NovaCart is a modern ecommerce web application designed with a high-performance interactive frontend using 3D elements, device sensors, and immersive UI experiences.

The platform supports two user roles: Buyers and Sellers, allowing sellers to manage products and buyers to browse, purchase, and interact with products through a smooth and visually rich interface.

Unlike typical AI-generated ecommerce websites, NovaCart prioritizes:

High-end UI/UX design

Sensor-driven interactions

3D product exploration

Fast checkout flows

Smooth micro-interactions

2. Product Goals
Primary Goals

Build a production-ready ecommerce application

Provide a highly interactive and modern frontend

Enable secure buyer and seller interactions

Deliver a smooth checkout experience

Secondary Goals

Make UI feel premium and handcrafted

Avoid common AI-generated UI patterns

Ensure high performance

3. Target Users
Buyers

People browsing and purchasing products online.

Capabilities:

Browse products

View product details

Add to cart

Checkout and pay

Manage orders

Sellers

People who want to sell products on the platform.

Capabilities:

Add products

Update products

Delete products

View product analytics

Manage inventory

4. Tech Stack
Development Tools

IDE: Cursor or Antigravity

AI assistant: Claude Code

Frontend

Next.js (App Router)

React

Three.js (3D rendering)

Framer Motion (micro interactions)

Backend

Supabase

PostgreSQL database

Authentication

Supabase Auth

Google OAuth login

Payments

Stripe

Hosting

Vercel

Version Control

GitHub

5. System Architecture
Client (NextJS Frontend)
        │
        │
Supabase Authentication
        │
        │
API Layer (NextJS Server Actions)
        │
        │
PostgreSQL Database
        │
        │
Stripe Payment Gateway
6. Core Features
6.1 Authentication

Users can log in using:

Google login

Email login

Users must choose their role during signup.

Roles:

Buyer

Seller

Authentication Flow

User clicks Login

Choose:

Continue with Google

Continue with Email

Select role:

Buyer

Seller

Account created

Redirect to dashboard

7. Buyer Features
7.1 Browse Products

Users can browse products from categories such as:

Electronics

Fashion

Home appliances

Furniture

Gaming

Beauty

Books

Each product card includes:

Product image

Name

Price

Rating

Add to cart button

7.2 Product Page

Product detail page includes:

3D product preview

Image gallery

Product description

Seller information

Price

Reviews

Add to cart button

Advanced UI Feature

Using Three.js, users can:

Rotate product models

Zoom into product

See product in 3D viewer

7.3 Cart System

Users can:

Add products to cart

Remove products

Update quantity

Cart automatically calculates:

Total price = Sum(product price × quantity)

Example:

Product	Price	Quantity	Total
Laptop	₹50000	1	₹50000
Headphones	₹3000	2	₹6000

Cart Total = ₹56000

7.4 Checkout Flow

Flow:

Cart
 → Checkout
 → Payment
 → Order confirmation

Checkout page includes:

Shipping details

Order summary

Payment button

7.5 Payment Integration

Payment handled via Stripe

Supported methods:

Card

UPI

Apple Pay / Google Pay (if enabled)

After successful payment:

Order created

User redirected to confirmation page

8. Seller Features
8.1 Seller Dashboard

Dashboard includes:

Total products

Sales overview

Inventory status

8.2 Add Product

Seller can add:

Product name

Category

Price

Description

Images

3D model (optional)

8.3 Edit Product

Seller can:

Update product price

Update description

Update images

Update stock

8.4 Delete Product

Seller can delete products from their inventory.

9. Database Design
Users Table
users

Fields

Field	Type
id	UUID
email	text
role	buyer/seller
created_at	timestamp
Products Table
products
Field	Type
id	UUID
name	text
price	number
category	text
description	text
seller_id	UUID
image_url	text
stock	integer
Cart Table
cart
Field	Type
id	UUID
user_id	UUID
product_id	UUID
quantity	integer
Orders Table
orders
Field	Type
id	UUID
user_id	UUID
total_price	number
payment_status	text
created_at	timestamp
10. UI/UX Design Guidelines
Colors

Avoid:

Default purple gradients

Neon glow effects

Preferred palette:

Neutral background

Soft accent color

Minimal gradients

Example palette:

Primary: #111111
Accent: #FF6B3D
Background: #F7F7F7
Text: #1C1C1C
Typography

Type scale example:

Element	Size
H1	48px
H2	36px
H3	28px
Body	16px

Consistent:

line height

spacing

font weight

Layout Rules

Use consistent spacing:

8px grid system

Border radius:

8px (buttons)
12px (cards)
16px (modals)
Animations

Animations must be purposeful.

Examples:

Product image hover lift (3px)

Add to cart micro animation

Smooth page transitions

Use:

cubic-bezier(0.4, 0, 0.2, 1)
Loading States

Every async action must include:

skeleton loading

progress indicators

disabled buttons

Example:

Add to cart → loading spinner
11. Advanced Frontend Features
3D Product Viewer

Built with ThreeJS

Users can:

rotate products

zoom

inspect details

Sensor Interactions

Using Device Motion API

Examples:

Tilt phone → rotate product

Mouse movement → parallax product display

Smart Product Carousel

Features:

physics-based scroll

drag gestures

smooth inertia

12. Performance Requirements

Target:

Page load < 2 seconds

Lighthouse score > 90

Optimized images

Lazy loading

13. Security

Use:

Supabase row-level security

JWT authentication

Stripe payment security

14. Future Features

Possible upgrades:

AI product recommendations

Augmented Reality product preview

Wishlist

Reviews and ratings

Seller analytics

Delivery tracking

15. Development Milestones
Phase 1

Setup project

NextJS

Supabase

Authentication

Phase 2

Core ecommerce

Product listing

Product page

Cart system

Phase 3

Seller features

Dashboard

Add product

Edit product

Phase 4

Payments

Stripe integration

Order flow

Phase 5

Advanced UI

3D viewer

Sensor interactions

animations

16. Success Metrics

Success measured by:

Smooth checkout rate

Page performance

User engagement

Conversion rate

✅ This PRD gives you a clear roadmap to build the app properly — not just vibe-code something.

If you want, I can also show you something extremely useful next:

I can design the full architecture of the app like a FAANG-level ecommerce system, including:

exact folder structure for NextJS

Supabase SQL schema

complete page list

component structure

3D product viewer implementation

cart state management

seller dashboard design

Basically a step-by-step blueprint so Claude can build it perfectly. 🚀

I also want it to have a chatbot live agent to get queries and respond accordingly 

Good idea. A live chatbot + AI assistant will make the ecommerce app feel much more like a real production platform (similar to Amazon, Flipkart, etc.). I’ll extend the PRD with a Customer Support System that includes:

🤖 AI chatbot

👨‍💻 Live agent support

📦 Order help

🔍 Product questions

💬 Real-time chat

Below is the new section you can add to your PRD.

17. Customer Support System (AI Chatbot + Live Agent)
Overview

NovaCart will include an integrated Customer Support Chat System that allows users to:

Ask questions about products

Get help with orders

Resolve payment issues

Talk to a live support agent if the AI cannot resolve the query

The system will combine:

AI chatbot automation

Human support escalation

This ensures fast responses and good user experience.

17.1 Chat System Features

The chatbot will appear as a floating support widget on every page.

Example placement:

Bottom Right Corner

Users can open chat anytime.

Functions include:

Product questions

Order help

Refund requests

Shipping updates

Technical support

17.2 Chat UI Design

Chat interface should include:

Components

Chat window

Message bubbles

Typing indicator

Agent avatar

Timestamp

File attachment (optional)

Example flow:

User: Do you have iPhone 15?

AI: Yes, we have multiple iPhone 15 models available.
Would you like to view them?

[View Products]
17.3 AI Chatbot Capabilities

The AI chatbot should be able to:

Product Assistance

Users can ask questions like:

"Show me gaming laptops under ₹80000"
"Do you sell Nike shoes?"
"Which phone has the best camera?"

The AI will search the database and respond with products.

Cart Assistance

Example:

User: What is in my cart?

AI: You currently have:

1 MacBook Air
1 Logitech Mouse

Total: ₹104000
Order Support

Example:

User: Where is my order?

AI: Your order #1423 is currently out for delivery.
Expected delivery: Tomorrow
FAQs

The chatbot can answer common questions like:

Shipping policies

Return policy

Refund timeline

Payment issues

17.4 Live Agent Escalation

If the chatbot cannot resolve the issue, the user can click:

"Talk to human agent"

The system will connect the user to a live support agent.

17.5 Live Agent Dashboard

Admin/support agents will have a Support Dashboard.

Features include:

Active chat sessions

Customer details

Order history

Quick response templates

Chat transfer

Agent Interface

Agents can:

reply to customers

view cart

view orders

suggest products

Example:

Customer: My payment failed.

Agent: I see your order attempt. Please try again or use another payment method.
17.6 Chat Architecture

Recommended system:

User
   │
Chat Widget (NextJS)
   │
Realtime Service
   │
Supabase Realtime / WebSockets
   │
Chat Database
17.7 Chat Database Tables
Conversations Table
conversations

Fields:

Field	Type
id	UUID
user_id	UUID
created_at	timestamp
status	open / closed
Messages Table
messages
Field	Type
id	UUID
conversation_id	UUID
sender	user / agent / bot
message	text
timestamp	timestamp
17.8 AI Chatbot Integration

Possible AI engines:

Option 1:

OpenAI API

Option 2:

Claude API

Option 3:

Local LLM (advanced)

The AI will be connected to:

product database

order database

FAQ knowledge base

17.9 Real-time Messaging

To make chat instant, use:

Supabase Realtime

or

WebSockets

This allows:

instant message delivery

typing indicators

live agent chat

17.10 Smart AI Features (Advanced)

Future upgrades could include:

Smart Product Suggestions

Example:

User: I need headphones under ₹5000

AI: Here are the top options
Sentiment Detection

If a user is angry:

"I am very frustrated with my order"

The system automatically escalates to a human agent.

Auto Refund Assistant

The chatbot can initiate refund requests automatically.

17.11 Chat UX Guidelines

To avoid cheap chatbot feel, follow these rules:

Do not:

spam automated responses

send long robotic messages

Instead:

short helpful responses

quick action buttons

Example:

Need help with this product?

[View Details]
[Add to Cart]
[Talk to Agent]
17.12 Performance Requirements

Chat response time:

< 1 second

Live agent response:

< 2 minutes
17.13 Security

Security requirements:

authenticated users only

encrypted chat messages

agent role access control

17.14 Success Metrics

Chat system success measured by:

average response time

customer satisfaction

issue resolution rate

reduced support tickets

Final Feature List of NovaCart

Your ecommerce app will now include:

✔ Buyer login
✔ Seller login
✔ Product management
✔ Cart system
✔ Checkout system
✔ Stripe payments
✔ 3D product viewer
✔ Sensor-based interactions
✔ Smooth UI animations
✔ AI chatbot
✔ Live support agents
✔ Real-time messaging