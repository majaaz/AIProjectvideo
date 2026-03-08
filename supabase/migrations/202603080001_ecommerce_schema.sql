-- Ecommerce Database Schema for Amazon-like App
-- Run this migration in your Supabase SQL Editor

-- =====================================================
-- EXTENSIONS
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================
CREATE TYPE user_role AS ENUM ('customer', 'seller', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

-- =====================================================
-- TABLE: users
-- =====================================================
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    role user_role DEFAULT 'customer',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: categories
-- =====================================================
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: products
-- =====================================================
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    compare_price DECIMAL(10, 2),
    images TEXT[] DEFAULT '{}',
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    seller_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    stock_quantity INTEGER DEFAULT 0,
    sku VARCHAR(100) UNIQUE,
    rating DECIMAL(3, 2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: orders
-- =====================================================
CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    status order_status DEFAULT 'pending',
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_address JSONB,
    payment_intent_id VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: order_items
-- =====================================================
CREATE TABLE public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_purchase DECIMAL(10, 2) NOT NULL
);

-- =====================================================
-- TABLE: cart
-- =====================================================
CREATE TABLE public.cart (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- =====================================================
-- TABLE: reviews
-- =====================================================
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(product_id, user_id)
);

-- =====================================================
-- TABLE: wishlists
-- =====================================================
CREATE TABLE public.wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- =====================================================
-- INDEXES
-- =====================================================
-- users indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_role ON public.users(role);

-- categories indexes
CREATE INDEX idx_categories_parent ON public.categories(parent_id);
CREATE INDEX idx_categories_slug ON public.categories(slug);

-- products indexes
CREATE INDEX idx_products_seller ON public.products(seller_id);
CREATE INDEX idx_products_category ON public.products(category_id);
CREATE INDEX idx_products_price ON public.products(price);
CREATE INDEX idx_products_rating ON public.products(rating DESC);
CREATE INDEX idx_products_created ON public.products(created_at DESC);

-- orders indexes
CREATE INDEX idx_orders_user ON public.orders(user_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created ON public.orders(created_at DESC);

-- order_items indexes
CREATE INDEX idx_order_items_order ON public.order_items(order_id);
CREATE INDEX idx_order_items_product ON public.order_items(product_id);

-- cart indexes
CREATE INDEX idx_cart_user ON public.cart(user_id);

-- reviews indexes
CREATE INDEX idx_reviews_product ON public.reviews(product_id);
CREATE INDEX idx_reviews_user ON public.reviews(user_id);

-- wishlists indexes
CREATE INDEX idx_wishlists_user ON public.wishlists(user_id);
CREATE INDEX idx_wishlists_product ON public.wishlists(product_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES: users
-- =====================================================
-- Users can read all users
CREATE POLICY "Anyone can view users"
    ON public.users FOR SELECT
    TO anon, authenticated
    USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON public.users FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- Only admins can insert/delete users
CREATE POLICY "Admins can manage users"
    ON public.users FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =====================================================
-- RLS POLICIES: categories
-- =====================================================
-- Anyone can view categories
CREATE POLICY "Anyone can view categories"
    ON public.categories FOR SELECT
    TO anon, authenticated
    USING (true);

-- Only admins can modify categories
CREATE POLICY "Admins can manage categories"
    ON public.categories FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =====================================================
-- RLS POLICIES: products
-- =====================================================
-- Anyone can view products
CREATE POLICY "Anyone can view products"
    ON public.products FOR SELECT
    TO anon, authenticated
    USING (true);

-- Sellers can create products
CREATE POLICY "Sellers can create products"
    ON public.products FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('seller', 'admin')
        )
    );

-- Sellers can update their own products
CREATE POLICY "Sellers can update own products"
    ON public.products FOR UPDATE
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role IN ('seller', 'admin')
        ) AND (seller_id = auth.uid() OR EXISTS (
            SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
        ))
    );

-- Only product owner or admin can delete
CREATE POLICY "Owners can delete products"
    ON public.products FOR DELETE
    TO authenticated
    USING (
        seller_id = auth.uid() OR EXISTS (
            SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- =====================================================
-- RLS POLICIES: orders
-- =====================================================
-- Users can view their own orders
CREATE POLICY "Users can view own orders"
    ON public.orders FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Users can create orders
CREATE POLICY "Users can create orders"
    ON public.orders FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Users can update their own orders (cancel)
CREATE POLICY "Users can update own orders"
    ON public.orders FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid());

-- =====================================================
-- RLS POLICIES: order_items
-- =====================================================
-- Users can view order items for their orders
CREATE POLICY "Users can view own order items"
    ON public.order_items FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE id = order_id AND user_id = auth.uid()
        )
    );

-- Users can create order items for their orders
CREATE POLICY "Users can create own order items"
    ON public.order_items FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE id = order_id AND user_id = auth.uid()
        )
    );

-- =====================================================
-- RLS POLICIES: cart
-- =====================================================
-- Users can view their own cart
CREATE POLICY "Users can view own cart"
    ON public.cart FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Users can manage their own cart
CREATE POLICY "Users can manage own cart"
    ON public.cart FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- =====================================================
-- RLS POLICIES: reviews
-- =====================================================
-- Anyone can view reviews
CREATE POLICY "Anyone can view reviews"
    ON public.reviews FOR SELECT
    TO anon, authenticated
    USING (true);

-- Authenticated users can create reviews
CREATE POLICY "Users can create reviews"
    ON public.reviews FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews"
    ON public.reviews FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid());

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
    ON public.reviews FOR DELETE
    TO authenticated
    USING (user_id = auth.uid());

-- =====================================================
-- RLS POLICIES: wishlists
-- =====================================================
-- Users can view their own wishlist
CREATE POLICY "Users can view own wishlist"
    ON public.wishlists FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Users can manage their own wishlist
CREATE POLICY "Users can manage own wishlist"
    ON public.wishlists FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- =====================================================
-- TRIGGERS: Update product rating when reviews change
-- =====================================================
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE public.products
        SET rating = (
            SELECT COALESCE(AVG(rating), 0)
            FROM public.reviews
            WHERE product_id = NEW.product_id
        ),
        review_count = (
            SELECT COUNT(*)
            FROM public.reviews
            WHERE product_id = NEW.product_id
        )
        WHERE id = NEW.product_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.products
        SET rating = (
            SELECT COALESCE(AVG(rating), 0)
            FROM public.reviews
            WHERE product_id = OLD.product_id
        ),
        review_count = (
            SELECT COUNT(*)
            FROM public.reviews
            WHERE product_id = OLD.product_id
        )
        WHERE id = OLD.product_id;
    END IF;
    IF TG_OP = 'INSERT' THEN
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        RETURN NEW;
    ELSE
        RETURN OLD;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rating_on_review
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- =====================================================
-- FUNCTION: Get current user
-- =====================================================
CREATE OR REPLACE FUNCTION public.get_current_user_id()
RETURNS UUID AS $$
BEGIN
    RETURN auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
