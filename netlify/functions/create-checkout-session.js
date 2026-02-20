const Stripe = require("stripe");

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { lineItems } = JSON.parse(event.body || "{}");
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "No line items" }) };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const siteUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || "http://localhost:8888";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,

      // Collect customer details securely on Stripe-hosted checkout:
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },

      // Collect shipping address (you can narrow allowed countries later):
      shipping_address_collection: {
        allowed_countries: [
          "GB","IE","FR","DE","ES","IT","NL","BE","SE","NO","DK","FI","PL","AT","PT","CH",
          "US","CA","AU","NZ"
        ]
      },

      success_url: `${siteUrl}/success.html`,
      cancel_url: `${siteUrl}/cancel.html`,

      // Optional: helps reduce fraud / abandoned checkout
      consent_collection: { terms_of_service: "required" }
    });

    return { statusCode: 200, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
