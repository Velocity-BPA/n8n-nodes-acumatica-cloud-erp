/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { AcumaticaCloudERP } from '../nodes/Acumatica Cloud ERP/Acumatica Cloud ERP.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('AcumaticaCloudERP Node', () => {
  let node: AcumaticaCloudERP;

  beforeAll(() => {
    node = new AcumaticaCloudERP();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Acumatica Cloud ERP');
      expect(node.description.name).toBe('acumaticaclouderp');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 7 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(7);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(7);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Customer Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        accessToken: 'test-token',
        baseUrl: 'https://test.acumatica.com/entity/Default/23.200.001'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  it('should create a customer successfully', async () => {
    const customerData = { CustomerID: 'CUST001', CustomerName: 'Test Customer' };
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('create')
      .mockReturnValueOnce(customerData);
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: 'CUST001' });

    const result = await executeCustomerOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: { id: 'CUST001' }, pairedItem: { item: 0 } }]);
    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://test.acumatica.com/entity/Default/23.200.001/Customer',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
      json: true,
    });
  });

  it('should get a customer by ID successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('get')
      .mockReturnValueOnce('CUST001')
      .mockReturnValueOnce('');
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ CustomerID: 'CUST001' });

    const result = await executeCustomerOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: { CustomerID: 'CUST001' }, pairedItem: { item: 0 } }]);
  });

  it('should handle errors when continue on fail is enabled', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeCustomerOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
  });
});

describe('Sales Order Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        accessToken: 'test-token',
        baseUrl: 'https://test.acumatica.com/entity/Default/23.200.001',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn(),
      },
    };
  });

  it('should get all sales orders successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAll')
      .mockReturnValueOnce('')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce('');

    const mockResponse = [{ id: '1', orderType: 'SO', orderNbr: 'SO001' }];
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeSalesOrderOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should get a specific sales order successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('get')
      .mockReturnValueOnce('SO')
      .mockReturnValueOnce('SO001')
      .mockReturnValueOnce('');

    const mockResponse = { id: '1', orderType: 'SO', orderNbr: 'SO001' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeSalesOrderOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should create a sales order successfully', async () => {
    const orderData = { orderType: 'SO', customerID: 'CUST001' };
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('create')
      .mockReturnValueOnce(orderData);

    const mockResponse = { id: '1', orderType: 'SO', orderNbr: 'SO001' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeSalesOrderOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should update a sales order successfully', async () => {
    const orderData = { customerID: 'CUST002' };
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('update')
      .mockReturnValueOnce('SO')
      .mockReturnValueOnce('SO001')
      .mockReturnValueOnce(orderData);

    const mockResponse = { id: '1', orderType: 'SO', orderNbr: 'SO001', customerID: 'CUST002' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeSalesOrderOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should delete a sales order successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('delete')
      .mockReturnValueOnce('SO')
      .mockReturnValueOnce('SO001');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({});

    const result = await executeSalesOrderOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({});
  });

  it('should handle errors when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeSalesOrderOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });

  it('should throw error when continueOnFail is false', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    await expect(
      executeSalesOrderOperations.call(mockExecuteFunctions, [{ json: {} }]),
    ).rejects.toThrow('API Error');
  });
});

describe('StockItem Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://test-tenant.acumatica.com',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	test('should get all stock items successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAll')
			.mockReturnValueOnce('')
			.mockReturnValueOnce(100)
			.mockReturnValueOnce(0)
			.mockReturnValueOnce('');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue([
			{ InventoryID: 'ITEM001', Description: 'Test Item 1' },
		]);

		const result = await executeStockItemOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual([
			{ InventoryID: 'ITEM001', Description: 'Test Item 1' },
		]);
	});

	test('should get single stock item successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('get')
			.mockReturnValueOnce('ITEM001')
			.mockReturnValueOnce('');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			InventoryID: 'ITEM001',
			Description: 'Test Item 1',
		});

		const result = await executeStockItemOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json.InventoryID).toBe('ITEM001');
	});

	test('should create stock item successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('create')
			.mockReturnValueOnce({ InventoryID: 'ITEM002', Description: 'New Item' });

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			InventoryID: 'ITEM002',
			Description: 'New Item',
		});

		const result = await executeStockItemOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json.InventoryID).toBe('ITEM002');
	});

	test('should update stock item successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('update')
			.mockReturnValueOnce('ITEM001')
			.mockReturnValueOnce({ Description: 'Updated Item' });

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
			InventoryID: 'ITEM001',
			Description: 'Updated Item',
		});

		const result = await executeStockItemOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json.Description).toBe('Updated Item');
	});

	test('should delete stock item successfully', async () => {
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('delete')
			.mockReturnValueOnce('ITEM001');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({});

		const result = await executeStockItemOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith(
			expect.objectContaining({
				method: 'DELETE',
				url: expect.stringContaining('ITEM001'),
			}),
		);
	});

	test('should handle errors when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get');
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(
			new Error('API Error'),
		);

		const result = await executeStockItemOperations.call(
			mockExecuteFunctions,
			[{ json: {} }],
		);

		expect(result).toHaveLength(1);
		expect(result[0].json.error).toBe('API Error');
	});

	test('should throw error when continueOnFail is false', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get');
		mockExecuteFunctions.continueOnFail.mockReturnValue(false);
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(
			new Error('API Error'),
		);

		await expect(
			executeStockItemOperations.call(mockExecuteFunctions, [{ json: {} }]),
		).rejects.toThrow('API Error');
	});
});

describe('Sales Invoice Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        accessToken: 'test-token',
        baseUrl: 'https://test.acumatica.com/entity/Default/23.200.001'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  it('should get all sales invoices successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAll')
      .mockReturnValueOnce('')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce('');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue([{ id: '1', type: 'Invoice' }]);

    const result = await executeSalesInvoiceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://test.acumatica.com/entity/Default/23.200.001/SalesInvoice?%24top=100&%24skip=0',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      json: true,
    });

    expect(result).toEqual([{ json: [{ id: '1', type: 'Invoice' }], pairedItem: { item: 0 } }]);
  });

  it('should get a specific sales invoice successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('get')
      .mockReturnValueOnce('Invoice')
      .mockReturnValueOnce('INV001')
      .mockReturnValueOnce('');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: '1', type: 'Invoice', referenceNbr: 'INV001' });

    const result = await executeSalesInvoiceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://test.acumatica.com/entity/Default/23.200.001/SalesInvoice/Invoice/INV001',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      json: true,
    });

    expect(result).toEqual([{ json: { id: '1', type: 'Invoice', referenceNbr: 'INV001' }, pairedItem: { item: 0 } }]);
  });

  it('should create a sales invoice successfully', async () => {
    const invoiceData = { type: 'Invoice', customerID: 'CUST001', amount: 1000 };

    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('create')
      .mockReturnValueOnce(invoiceData);

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: '1', ...invoiceData });

    const result = await executeSalesInvoiceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://test.acumatica.com/entity/Default/23.200.001/SalesInvoice',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      body: invoiceData,
      json: true,
    });

    expect(result).toEqual([{ json: { id: '1', ...invoiceData }, pairedItem: { item: 0 } }]);
  });

  it('should update a sales invoice successfully', async () => {
    const invoiceData = { amount: 1200, status: 'Released' };

    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('update')
      .mockReturnValueOnce('Invoice')
      .mockReturnValueOnce('INV001')
      .mockReturnValueOnce(invoiceData);

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ id: '1', ...invoiceData });

    const result = await executeSalesInvoiceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'PUT',
      url: 'https://test.acumatica.com/entity/Default/23.200.001/SalesInvoice/Invoice/INV001',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      body: invoiceData,
      json: true,
    });

    expect(result).toEqual([{ json: { id: '1', ...invoiceData }, pairedItem: { item: 0 } }]);
  });

  it('should delete a sales invoice successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('delete')
      .mockReturnValueOnce('Invoice')
      .mockReturnValueOnce('INV001');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({ success: true });

    const result = await executeSalesInvoiceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
      method: 'DELETE',
      url: 'https://test.acumatica.com/entity/Default/23.200.001/SalesInvoice/Invoice/INV001',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      json: true,
    });

    expect(result).toEqual([{ json: { success: true }, pairedItem: { item: 0 } }]);
  });

  it('should handle errors and continue on fail', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeSalesInvoiceOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
  });

  it('should throw error when continue on fail is false', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
    mockExecuteFunctions.continueOnFail.mockReturnValue(false);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    await expect(executeSalesInvoiceOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('API Error');
  });
});

describe('PurchaseOrder Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://tenant.acumatica.com/entity/Default/23.200.001',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	describe('getAll operation', () => {
		it('should get all purchase orders successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getAll')
				.mockReturnValueOnce('')
				.mockReturnValueOnce(100)
				.mockReturnValueOnce(0)
				.mockReturnValueOnce('');

			const mockResponse = [{ OrderType: 'PO', OrderNbr: '001' }];
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executePurchaseOrderOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://tenant.acumatica.com/entity/Default/23.200.001/PurchaseOrder?$top=100&$skip=0',
				headers: {
					'Authorization': 'Bearer test-token',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});

		it('should handle getAll operation error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

			await expect(
				executePurchaseOrderOperations.call(mockExecuteFunctions, [{ json: {} }])
			).rejects.toThrow('API Error');
		});
	});

	describe('get operation', () => {
		it('should get purchase order by type and number successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('get')
				.mockReturnValueOnce('PO')
				.mockReturnValueOnce('001')
				.mockReturnValueOnce('');

			const mockResponse = { OrderType: 'PO', OrderNbr: '001' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executePurchaseOrderOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle get operation error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Not found'));

			await expect(
				executePurchaseOrderOperations.call(mockExecuteFunctions, [{ json: {} }])
			).rejects.toThrow('Not found');
		});
	});

	describe('create operation', () => {
		it('should create purchase order successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('create')
				.mockReturnValueOnce({ OrderType: 'PO', VendorID: 'VENDOR001' });

			const mockResponse = { OrderType: 'PO', OrderNbr: '002' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executePurchaseOrderOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle create operation error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('create');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Validation error'));

			await expect(
				executePurchaseOrderOperations.call(mockExecuteFunctions, [{ json: {} }])
			).rejects.toThrow('Validation error');
		});
	});

	describe('update operation', () => {
		it('should update purchase order successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('update')
				.mockReturnValueOnce('PO')
				.mockReturnValueOnce('001')
				.mockReturnValueOnce({ Status: 'Open' });

			const mockResponse = { OrderType: 'PO', OrderNbr: '001', Status: 'Open' };
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executePurchaseOrderOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle update operation error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('update');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Update failed'));

			await expect(
				executePurchaseOrderOperations.call(mockExecuteFunctions, [{ json: {} }])
			).rejects.toThrow('Update failed');
		});
	});

	describe('delete operation', () => {
		it('should delete purchase order successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('delete')
				.mockReturnValueOnce('PO')
				.mockReturnValueOnce('001');

			const mockResponse = {};
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executePurchaseOrderOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});

		it('should handle delete operation error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('delete');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Delete failed'));

			await expect(
				executePurchaseOrderOperations.call(mockExecuteFunctions, [{ json: {} }])
			).rejects.toThrow('Delete failed');
		});
	});
});

describe('Vendor Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				accessToken: 'test-token',
				baseUrl: 'https://test.acumatica.com/entity/Default/23.200.001',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should get all vendors successfully', async () => {
		const mockResponse = [
			{ id: 'VENDOR001', name: 'Test Vendor 1' },
			{ id: 'VENDOR002', name: 'Test Vendor 2' },
		];

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getAll')
			.mockReturnValueOnce('')
			.mockReturnValueOnce(100)
			.mockReturnValueOnce(0)
			.mockReturnValueOnce('');
		
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeVendorOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://test.acumatica.com/entity/Default/23.200.001/Vendor',
			headers: {
				'Authorization': 'Bearer test-token',
				'Content-Type': 'application/json',
			},
			json: true,
		});
	});

	it('should get vendor by ID successfully', async () => {
		const mockResponse = { id: 'VENDOR001', name: 'Test Vendor' };

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('get')
			.mockReturnValueOnce('VENDOR001')
			.mockReturnValueOnce('');
		
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeVendorOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://test.acumatica.com/entity/Default/23.200.001/Vendor/VENDOR001',
			headers: {
				'Authorization': 'Bearer test-token',
				'Content-Type': 'application/json',
			},
			json: true,
		});
	});

	it('should create vendor successfully', async () => {
		const vendorData = { name: 'New Vendor', type: 'Supplier' };
		const mockResponse = { id: 'VENDOR003', ...vendorData };

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('create')
			.mockReturnValueOnce(JSON.stringify(vendorData));
		
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeVendorOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://test.acumatica.com/entity/Default/23.200.001/Vendor',
			headers: {
				'Authorization': 'Bearer test-token',
				'Content-Type': 'application/json',
			},
			body: vendorData,
			json: true,
		});
	});

	it('should update vendor successfully', async () => {
		const vendorData = { name: 'Updated Vendor' };
		const mockResponse = { id: 'VENDOR001', ...vendorData };

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('update')
			.mockReturnValueOnce('VENDOR001')
			.mockReturnValueOnce(JSON.stringify(vendorData));
		
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeVendorOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'PUT',
			url: 'https://test.acumatica.com/entity/Default/23.200.001/Vendor/VENDOR001',
			headers: {
				'Authorization': 'Bearer test-token',
				'Content-Type': 'application/json',
			},
			body: vendorData,
			json: true,
		});
	});

	it('should delete vendor successfully', async () => {
		const mockResponse = { success: true };

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('delete')
			.mockReturnValueOnce('VENDOR001');
		
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeVendorOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'DELETE',
			url: 'https://test.acumatica.com/entity/Default/23.200.001/Vendor/VENDOR001',
			headers: {
				'Authorization': 'Bearer test-token',
				'Content-Type': 'application/json',
			},
			json: true,
		});
	});

	it('should handle API errors', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get').mockReturnValueOnce('INVALID');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Vendor not found'));

		await expect(executeVendorOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('Vendor not found');
	});

	it('should continue on fail when configured', async () => {
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('get').mockReturnValueOnce('INVALID');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('Vendor not found'));

		const result = await executeVendorOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json.error).toBe('Vendor not found');
	});
});

describe('Journal Transaction Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        accessToken: 'test-token',
        baseUrl: 'https://test.acumatica.com'
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
        requestWithAuthentication: jest.fn()
      },
    };
  });

  it('should get all journal transactions successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAll')
      .mockReturnValueOnce('')
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce('');

    const mockResponse = [{ BatchNbr: 'JT001', Description: 'Test Transaction' }];
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeJournalTransactionOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should get journal transaction by batch number successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('get')
      .mockReturnValueOnce('JT001')
      .mockReturnValueOnce('');

    const mockResponse = { BatchNbr: 'JT001', Description: 'Test Transaction' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeJournalTransactionOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should create journal transaction successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('create')
      .mockReturnValueOnce('{"Description":"New Transaction"}');

    const mockResponse = { BatchNbr: 'JT002', Description: 'New Transaction' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeJournalTransactionOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should update journal transaction successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('update')
      .mockReturnValueOnce('JT001')
      .mockReturnValueOnce('{"Description":"Updated Transaction"}');

    const mockResponse = { BatchNbr: 'JT001', Description: 'Updated Transaction' };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeJournalTransactionOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should delete journal transaction successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('delete')
      .mockReturnValueOnce('JT001');

    const mockResponse = { success: true };
    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

    const result = await executeJournalTransactionOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual(mockResponse);
  });

  it('should handle errors gracefully when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeJournalTransactionOperations.call(
      mockExecuteFunctions,
      [{ json: {} }]
    );

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });

  it('should throw error when continueOnFail is false', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getAll');
    mockExecuteFunctions.continueOnFail.mockReturnValue(false);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    await expect(
      executeJournalTransactionOperations.call(mockExecuteFunctions, [{ json: {} }])
    ).rejects.toThrow('API Error');
  });
});
});
