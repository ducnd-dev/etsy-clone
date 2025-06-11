# 🔧 Metafields Setup Guide for Etsy Clone

## 📋 Overview
Metafields are custom fields that allow you to store additional information for products, collections, customers, and other objects in Shopify. In the Etsy Clone, we use metafields to create features like Bestseller badges, New Arrivals, Free Shipping indicators, and Items Sold counters.

## 🎯 Required Metafields

### **Namespace:** `etsy`
All metafields use the `etsy` namespace for easy management and to avoid conflicts.

| Field Name | Type | Key | Description |
|------------|------|-----|-------------|
| **Bestseller Product** | `boolean` | `bestseller` | Mark product as bestseller |
| **New Arrival** | `boolean` | `new_arrival` | Mark product as new arrival |
| **Free Shipping** | `boolean` | `free_shipping` | Product has free shipping |
| **Items Sold** | `number_integer` | `items_sold` | Number of items sold |

---

## 🛠️ Setup Methods

### **Method 1: Via Shopify Admin Panel (Recommended)**

#### **Step 1: Access Settings**
1. Log in to **Shopify Admin**
2. Go to **Settings** → **Custom data**
3. Select **Products**

#### **Step 2: Create Metafield Definitions**

##### **🏆 Bestseller Product**
```
Name: Bestseller Product
Namespace and key: etsy.bestseller
Description: Mark product as bestseller for filtering
Type: Boolean
Validation: None
```

##### **🆕 New Arrival**
```
Name: New Arrival
Namespace and key: etsy.new_arrival
Description: Mark product as new arrival
Type: Boolean
Validation: None
```

##### **🚚 Free Shipping**
```
Name: Free Shipping
Namespace and key: etsy.free_shipping
Description: Product has free shipping
Type: Boolean
Validation: None
```

##### **📊 Items Sold**
```
Name: Items Sold
Namespace and key: etsy.items_sold
Description: Number of items sold
Type: Integer
Validation: Minimum value: 0
```

#### **Step 3: Save Definitions**
After creating all definitions, the metafields will appear in the product edit page.

---

### **Method 2: Via CSV Import**

#### **Step 1: Create CSV Template**
Create a file called `metafields_template.csv`:

```csv
Handle,Title,Vendor,Type,Tags,Published,Option1 Name,Option1 Value,Variant SKU,Variant Grams,Variant Inventory Tracker,Variant Inventory Qty,Variant Inventory Policy,Variant Fulfillment Service,Variant Price,Variant Compare At Price,Variant Requires Shipping,Variant Taxable,Variant Barcode,Image Src,Image Position,Image Alt Text,Gift Card,SEO Title,SEO Description,Google Shopping / Google Product Category,Google Shopping / Gender,Google Shopping / Age Group,Google Shopping / MPN,Google Shopping / AdWords Grouping,Google Shopping / AdWords Labels,Google Shopping / Condition,Google Shopping / Custom Product,Google Shopping / Custom Label 0,Google Shopping / Custom Label 1,Google Shopping / Custom Label 2,Google Shopping / Custom Label 3,Google Shopping / Custom Label 4,Variant Image,Variant Weight Unit,Variant Tax Code,Cost per item,Status,Metafield: etsy.bestseller [boolean],Metafield: etsy.new_arrival [boolean],Metafield: etsy.free_shipping [boolean],Metafield: etsy.items_sold [number_integer]
personalized-cutting-board,Personalized Cutting Board,HandmadeStore,physical,kitchen home-decor personalized,TRUE,,,SKU-CB-001,500,shopify,10,deny,manual,45.99,55.99,TRUE,TRUE,,https://example.com/image1.jpg,1,Personalized Cutting Board,FALSE,Custom Cutting Board,Personalized wooden cutting board for kitchen,Home & Garden > Kitchen & Dining > Kitchen Tools & Utensils,,,,,,new,,,,,,,,kg,,25.00,active,TRUE,FALSE,TRUE,156
custom-photo-frame,Custom Photo Frame,ArtisanCrafts,physical,photo-frame personalized home-decor,TRUE,,,SKU-PF-002,300,shopify,25,deny,manual,29.99,39.99,TRUE,TRUE,,https://example.com/image2.jpg,1,Custom Photo Frame,FALSE,Personalized Photo Frame,Custom photo frame with engraving,Home & Garden > Decor > Picture Frames,,,,,,new,,,,,,,,kg,,15.00,active,FALSE,TRUE,TRUE,89
```

#### **Step 2: Import CSV**
1. Go to **Products** → **Import**
2. Upload the CSV file
3. Map the columns to metafields
4. Click **Import products**

---

### **Method 3: Via Shopify API (Advanced)**

#### **GraphQL Mutation to create Metafield Definition:**

```graphql
mutation metafieldDefinitionCreate($definition: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $definition) {
    createdDefinition {
      id
      name
      namespace
      key
      type {
        name
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

**Variables for Bestseller:**
```json
{
  "definition": {
    "name": "Bestseller Product",
    "namespace": "etsy",
    "key": "bestseller",
    "description": "Mark product as bestseller",
    "type": "boolean",
    "ownerType": "PRODUCT"
  }
}
```

---

## 📝 How to Use Metafields

### **1. Set Values for Products**

#### **Via Admin Panel:**
1. Go to **Products** → select product to edit
2. Scroll down to **Metafields** section
3. Set values:
   - **Bestseller Product**: ✓ (checked) or ✗ (unchecked)
   - **New Arrival**: ✓ or ✗
   - **Free Shipping**: ✓ or ✗
   - **Items Sold**: enter number (e.g., 156)

#### **Via CSV:**
```csv
Handle,Metafield: etsy.bestseller [boolean],Metafield: etsy.new_arrival [boolean],Metafield: etsy.free_shipping [boolean],Metafield: etsy.items_sold [number_integer]
product-handle,TRUE,FALSE,TRUE,156
another-product,FALSE,TRUE,FALSE,89
```

### **2. Read Values in Template**

#### **Current code in `etsy-product-grid.liquid`:**

```liquid
<!-- Data attributes for filtering -->
<div class="product-item" 
     data-product-bestseller="{% if product.metafields.etsy.bestseller.value %}true{% else %}false{% endif %}"
     data-product-new="{% if product.metafields.etsy.new_arrival.value %}true{% else %}false{% endif %}"
     data-product-free-shipping="{% if product.metafields.etsy.free_shipping.value %}true{% else %}false{% endif %}">

<!-- Bestseller badge -->
{% if product.metafields.etsy.bestseller.value %}
  <div class="absolute top-2 right-2 bg-etsy-orange text-white px-2 py-1 rounded text-xs font-bold uppercase shadow-sm">
    Bestseller
  </div>
{% endif %}

<!-- New Arrival badge -->
{% if product.metafields.etsy.new_arrival.value %}
  <div class="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold uppercase shadow-sm">
    New
  </div>
{% endif %}

<!-- Free shipping text -->
{% if product.metafields.etsy.free_shipping.value %}
  <p class="text-etsy-orange font-medium">FREE shipping</p>
{% endif %}

<!-- Items sold -->
{% if product.metafields.etsy.items_sold.value %}
  <p class="text-gray-500">{{ product.metafields.etsy.items_sold.value }} sold</p>
{% endif %}
```

---

## 🧪 Testing & Validation

### **1. Verify Metafields are Created Correctly:**
```liquid
<!-- Debug template for testing -->
<div style="background: #f0f0f0; padding: 10px; margin: 10px;">
  <h4>Debug: {{ product.title }}</h4>
  <p>Bestseller: {{ product.metafields.etsy.bestseller.value }}</p>
  <p>New Arrival: {{ product.metafields.etsy.new_arrival.value }}</p>
  <p>Free Shipping: {{ product.metafields.etsy.free_shipping.value }}</p>
  <p>Items Sold: {{ product.metafields.etsy.items_sold.value }}</p>
</div>
```

### **2. Test Filters:**
1. Create several products with different metafield values
2. Test filter buttons on frontend
3. Verify JavaScript filtering works correctly

### **3. Bulk Update Script (Optional):**
```javascript
// Browser console script for bulk updating metafields
// (For testing only, use CSV for production)
const products = document.querySelectorAll('.product-item');
products.forEach((product, index) => {
  if (index % 3 === 0) {
    product.setAttribute('data-product-bestseller', 'true');
  }
  if (index % 4 === 0) {
    product.setAttribute('data-product-new', 'true');
  }
});
```

---

## 📊 Sample Data

### **Products with Metafields Set:**

| Product | Bestseller | New Arrival | Free Shipping | Items Sold |
|---------|------------|-------------|---------------|------------|
| Personalized Cutting Board | ✓ | ✗ | ✓ | 156 |
| Custom Photo Frame | ✗ | ✓ | ✓ | 89 |
| Handmade Necklace | ✓ | ✗ | ✗ | 234 |
| Vintage Poster | ✗ | ✗ | ✓ | 67 |
| Custom Mug | ✗ | ✓ | ✓ | 123 |

---

## 🚨 Troubleshooting

### **Common Issues:**

#### **1. Metafields not displaying:**
- **Solution**: Check namespace and key are correct `etsy.bestseller`, `etsy.new_arrival`, etc.
- **Check**: Verify template uses `.value`: `product.metafields.etsy.bestseller.value`

#### **2. Filters not working:**
- **Check**: Data attributes in HTML must match JavaScript
- **Verify**: Use console.log to check if values are passed correctly

#### **3. CSV Import errors:**
- **Solution**: Ensure header format is correct: `Metafield: etsy.bestseller [boolean]`
- **Check**: Boolean values must be `TRUE`/`FALSE` (uppercase)

#### **4. Performance issues:**
- **Solution**: Limit number of products and use pagination
- **Optimize**: Cache metafields if you have many products

---

## 🎯 Best Practices

### **1. Naming Convention:**
- Namespace: `etsy` (consistent)
- Keys: snake_case (`new_arrival`, `items_sold`)
- Names: Title Case (`Bestseller Product`)

### **2. Data Types:**
- **Boolean**: for true/false values (bestseller, new_arrival)
- **Integer**: for numbers (items_sold)
- **Text**: for short strings (if needed)

### **3. Performance:**
- Only load metafields when necessary
- Use filters efficiently
- Cache data if possible

### **4. Maintenance:**
- Document all metafields
- Regular cleanup of unused metafields
- Monitor performance impact

---

## 📞 Support

If you have issues with metafields setup:

1. **Check Shopify Documentation**: [Metafields Documentation](https://shopify.dev/docs/apps/metafields)
2. **Test with sample products** before applying to entire store
3. **Backup data** before bulk imports
4. **Use staging environment** for testing

---

## 🎉 Conclusion

After setting up metafields following this guide, you will have:

- ✅ **Functional filters**: Bestsellers, New Arrivals, On Sale, Free Shipping
- ✅ **Visual badges**: Display on product cards
- ✅ **Social proof**: Items sold numbers
- ✅ **Enhanced UX**: Better product discovery
- ✅ **Scalable system**: Easy to add new metafields

**🚀 Your Etsy Clone is now ready with a professional metafields system!**
