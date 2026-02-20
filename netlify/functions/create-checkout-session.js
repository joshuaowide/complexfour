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

    const siteUrl =
      process.env.URL || process.env.DEPLOY_PRIME_URL || "http://localhost:8888";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/success.html`,
      cancel_url: `${siteUrl}/cancel.html`,
      // Optional:
      // shipping_address_collection: { allowed_countries: ["GB", "US", "CA", "AU", "IE", "DE", "FR"] },
      // phone_number_collection: { enabled: true }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
