# n8n-nodes-acumatica-cloud-erp

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides comprehensive integration with Acumatica Cloud ERP system. With 7 core resources implemented, it enables seamless automation of financial operations, customer management, inventory control, and accounting workflows directly within your n8n automations.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![ERP](https://img.shields.io/badge/ERP-Acumatica-orange)
![Cloud](https://img.shields.io/badge/Cloud-Ready-green)
![Financial](https://img.shields.io/badge/Financial-Automation-purple)

## Features

- **Customer Management** - Create, update, retrieve, and manage customer records with comprehensive contact information
- **Sales Operations** - Complete sales order lifecycle management from creation to fulfillment
- **Inventory Control** - Stock item management including creation, updates, and inventory tracking
- **Invoice Processing** - Automated sales invoice generation, updates, and payment tracking
- **Purchase Management** - Purchase order creation and vendor relationship management
- **Vendor Operations** - Comprehensive vendor management with contact and payment term handling
- **Financial Transactions** - Journal transaction processing for accounting and financial reporting
- **Secure API Integration** - API key-based authentication for secure ERP connectivity

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-acumatica-cloud-erp`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-acumatica-cloud-erp
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-acumatica-cloud-erp.git
cd n8n-nodes-acumatica-cloud-erp
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-acumatica-cloud-erp
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Acumatica API access key | Yes |
| Base URL | Your Acumatica instance base URL | Yes |
| Company | Company database identifier | Yes |
| API Version | Acumatica API version (default: 22.200.001) | No |

## Resources & Operations

### 1. Customer

| Operation | Description |
|-----------|-------------|
| Create | Create a new customer record |
| Update | Update existing customer information |
| Get | Retrieve customer details by ID |
| Get All | List all customers with optional filtering |
| Delete | Remove customer record |

### 2. Sales Order

| Operation | Description |
|-----------|-------------|
| Create | Create new sales order |
| Update | Modify existing sales order |
| Get | Retrieve sales order by order number |
| Get All | List all sales orders with filtering options |
| Delete | Cancel/delete sales order |
| Add Line | Add line item to existing order |
| Update Line | Modify order line details |

### 3. Stock Item

| Operation | Description |
|-----------|-------------|
| Create | Create new inventory item |
| Update | Update stock item information |
| Get | Retrieve item details by inventory ID |
| Get All | List all stock items with filtering |
| Delete | Remove stock item |
| Adjust Quantity | Update inventory quantities |

### 4. Sales Invoice

| Operation | Description |
|-----------|-------------|
| Create | Generate new sales invoice |
| Update | Modify invoice details |
| Get | Retrieve invoice by reference number |
| Get All | List all invoices with date/status filters |
| Release | Release invoice for payment |
| Void | Void existing invoice |

### 5. Purchase Order

| Operation | Description |
|-----------|-------------|
| Create | Create new purchase order |
| Update | Modify purchase order details |
| Get | Retrieve PO by order number |
| Get All | List purchase orders with filtering |
| Release | Release PO for processing |
| Cancel | Cancel purchase order |

### 6. Vendor

| Operation | Description |
|-----------|-------------|
| Create | Create new vendor record |
| Update | Update vendor information |
| Get | Retrieve vendor details by ID |
| Get All | List all vendors with filtering |
| Delete | Remove vendor record |

### 7. Journal Transaction

| Operation | Description |
|-----------|-------------|
| Create | Create journal entry |
| Update | Modify journal transaction |
| Get | Retrieve transaction by batch number |
| Get All | List journal transactions |
| Release | Post transaction to general ledger |
| Reverse | Create reversing entry |

## Usage Examples

```javascript
// Create a new customer
{
  "customerID": "CUST001",
  "customerName": "ABC Corporation",
  "mainContact": {
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@abc-corp.com"
  },
  "customerClass": "COMMERCIAL",
  "terms": "NET30"
}
```

```javascript
// Create a sales order
{
  "customerID": "CUST001",
  "orderType": "SO",
  "description": "Monthly service order",
  "details": [
    {
      "inventoryID": "SERVICE001",
      "quantity": 1,
      "unitPrice": 500.00
    }
  ]
}
```

```javascript
// Update stock item inventory
{
  "inventoryID": "ITEM001",
  "warehouseID": "MAIN",
  "qtyOnHand": 150,
  "unitCost": 25.50,
  "lastCost": 24.75
}
```

```javascript
// Create journal transaction
{
  "batchNbr": "JE202401001",
  "description": "Monthly accruals",
  "details": [
    {
      "account": "1200",
      "debitAmount": 1000.00,
      "description": "Accounts Receivable"
    },
    {
      "account": "4000",
      "creditAmount": 1000.00,
      "description": "Service Revenue"
    }
  ]
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Authentication Failed | Invalid API key or credentials | Verify API key and instance URL in credentials |
| Record Not Found | Requested entity doesn't exist | Check entity ID/number format and existence |
| Validation Error | Required fields missing or invalid | Review Acumatica field requirements and data types |
| Permission Denied | Insufficient user permissions | Ensure API user has proper role assignments |
| Rate Limit Exceeded | Too many API requests | Implement delays between requests or batch operations |
| Connection Timeout | Network or server issues | Check instance availability and network connectivity |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-acumatica-cloud-erp/issues)
- **Acumatica API Documentation**: [help.acumatica.com](https://help.acumatica.com/)
- **Acumatica Developer Community**: [community.acumatica.com](https://community.acumatica.com/)