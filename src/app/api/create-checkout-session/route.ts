import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    console.log('🔴 ROUTE CALLED');
    
    const { orderId, email } = await request.json();
    console.log('🔴 Order ID:', orderId);
    console.log('🔴 Customer Email:', email);

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }

    console.log('🔴 Fetching from Firebase...');
    const orderRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);
    
    if (!orderSnap.exists()) {
      console.log('🔴 Order not found');
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const orderData = orderSnap.data();
    const items = orderData.items || [];
    
    const total = items.reduce((sum: number, item: any) => {
      const price = Number(item.price || item.unit_price || 0) || 0;
      const qty = Number(item.qty || item.quantity || 0) || 0;
      return sum + price * qty;
    }, 0);

    console.log('🔴 Total:', total);
    console.log('🔴 Stripe key exists:', !!process.env.STRIPE_SECRET_KEY);

    console.log('🔴 Creating Stripe session...');
    
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card', 'fpx', 'grabpay'],
      line_items: [
        {
          price_data: {
            currency: 'myr',
            product_data: { 
              name: `Order #${orderId}`,
              description: `${items.length} item(s)`
            },
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?orderId=${orderId}`,
    };

    if (email) {
      sessionConfig.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    console.log('🔴 Session created:', session.id);
    return NextResponse.json({ url: session.url });

  } catch (error) {
    console.error('🔴 ERROR:', error);
    console.error('🔴 Error type:', error instanceof Error ? error.constructor.name : typeof error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' }, 
      { status: 500 }
    );
  }
}