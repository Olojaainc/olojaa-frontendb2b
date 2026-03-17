import { http, HttpResponse } from 'msw'
import { orderConstant } from '../app/Constants/Orders'
import { orderBreakdownConstant } from '../app/Constants/OrderBreakdowns'
import { transactionConstant } from '../app/Constants/Transactions'
import { DisputeTypesConstant } from '../app/Constants/DisputeTypes'
import { userConstant } from '../app/Constants/Users'

const BASE_URL = process.env.HEROKU_BASE_URL || process.env.NEXT_PUBLIC_HEROKU_BASE_URL || ''

function createApiResponse<T>(data: T) {
  return {
    data,
    status: true,
    message: 'Success',
    links: {
      first: '',
      last: '',
      prev: null,
      next: null,
    },
    meta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      links: [],
      path: '',
      per_page: 10,
      to: 1,
      total: Array.isArray(data) ? data.length : 1,
      filter_applied: 'none',
    },
  }
}

export const handlers = [
  // Auth - Login
  http.post(`${BASE_URL}/auth/login`, async ({ request }) => {
    const body = await request.json() as { email: string; password: string }
    const matchedUser = userConstant.find(
      (u) => u.email === body.email && u.password === body.password
    )

    if (!matchedUser) {
      return HttpResponse.json(
        { status: false, message: 'Invalid credentials. Please try again.' },
        { status: 401 }
      )
    }

    const slug = matchedUser.name.toLowerCase().replace(/\s+/g, '-')
    return HttpResponse.json({
      status: true,
      message: 'Login successful',
      data: {
        slug,
        token: `mock-token-${slug}`,
        name: matchedUser.name,
        email: matchedUser.email,
      },
    })
  }),

  // Auth - Register
  http.post(`${BASE_URL}/auth/register`, async ({ request }) => {
    const body = await request.json() as { name: string; email: string }
    const slug = body.name.toLowerCase().replace(/\s+/g, '-')
    return HttpResponse.json({
      status: true,
      message: 'Registration successful',
      data: {
        slug,
        token: `mock-token-${slug}`,
        name: body.name,
        email: body.email,
      },
    })
  }),

  // Auth - Reset Password
  http.post(`${BASE_URL}/reset-password`, () => {
    return HttpResponse.json({
      status: true,
      message: 'Password reset link sent successfully',
    })
  }),

  // Auth - Change Password
  http.post(`${BASE_URL}/change-password`, () => {
    return HttpResponse.json({
      status: true,
      message: 'Password changed successfully',
    })
  }),

  // Orders
  http.get(`${BASE_URL}/business/orders`, ({ request }) => {
    const url = new URL(request.url)
    let filtered = orderConstant

    const status = url.searchParams.get('order_status')
    if (status) {
      filtered = filtered.filter((o) => o.status === status)
    }

    const perPage = url.searchParams.get('per_page')
    if (perPage) {
      filtered = filtered.slice(0, parseInt(perPage))
    }

    return HttpResponse.json(createApiResponse(filtered))
  }),

  // Order Management
  http.get(`${BASE_URL}/business/order-management`, () => {
    return HttpResponse.json(
      createApiResponse({
        pendingOrders: orderConstant.filter((o) => o.status === 'pending').length,
        rejectedOrders: orderConstant.filter((o) => o.status === 'cancelled').length,
        completedOrders: orderConstant.filter((o) => o.status === 'completed' || o.status === 'delivered').length,
        recurringOrders: orderConstant.filter((o) => o.status === 'recurring').length,
        totalOrders: orderConstant.length,
      })
    )
  }),

  // Order Breakdown
  http.post(`${BASE_URL}/business/order-breakdown`, async ({ request }) => {
    const body = await request.json() as { quantity: number }
    const breakdown =
      orderBreakdownConstant.find((b) => b.quantity === body.quantity) ||
      orderBreakdownConstant[0]
    return HttpResponse.json(createApiResponse(breakdown))
  }),

  // Create Order
  http.post(`${BASE_URL}/business/create-order`, () => {
    return HttpResponse.json(
      createApiResponse({
        authorization_url: 'https://checkout.paystack.com/mock',
        access_code: 'mock-access-code',
        reference: `REF-${Date.now()}`,
      })
    )
  }),

  // Deliveries
  http.get(`${BASE_URL}/business/deliveries`, () => {
    const deliveries = orderConstant.filter(
      (o) => o.status === 'delivered' || o.status === 'confirmed' || o.status === 'pending'
    )
    return HttpResponse.json(createApiResponse(deliveries))
  }),

  // Delivery Breakdown
  http.get(`${BASE_URL}/business/delivery-breakdown`, () => {
    return HttpResponse.json(
      createApiResponse({
        all_deliveries: orderConstant.length,
        pending_deliveries: orderConstant.filter((o) => o.status === 'pending').length,
        in_transit: orderConstant.filter((o) => o.status === 'confirmed').length,
        completed: orderConstant.filter((o) => o.status === 'delivered' || o.status === 'completed').length,
      })
    )
  }),

  // Transactions
  http.get(`${BASE_URL}/transactions`, ({ request }) => {
    const url = new URL(request.url)
    let filtered = transactionConstant
    const filter = url.searchParams.get('filter')

    if (filter && filter !== 'date_range') {
      const currentDate = new Date()
      const filterDate = new Date()

      switch (filter) {
        case 'yesterday':
          filterDate.setDate(currentDate.getDate() - 1)
          break
        case 'last_7_days':
          filterDate.setDate(currentDate.getDate() - 7)
          break
        case 'last_30_days':
          filterDate.setDate(currentDate.getDate() - 30)
          break
      }

      filtered = transactionConstant.filter(
        (t) => new Date(t.created_at) >= filterDate
      )
    }

    if (filter === 'date_range') {
      const from = url.searchParams.get('from')
      const to = url.searchParams.get('to')
      if (from && to) {
        const fromDate = new Date(from)
        const toDate = new Date(to)
        filtered = transactionConstant.filter((t) => {
          const d = new Date(t.created_at)
          return d >= fromDate && d <= toDate
        })
      }
    }

    return HttpResponse.json(createApiResponse(filtered))
  }),

  // Transaction Breakdown
  http.get(`${BASE_URL}/business/transaction-breakdown`, () => {
    return HttpResponse.json(
      createApiResponse({
        pendingTransactions: transactionConstant.filter((t) => t.status === 'pending').length,
        successfulTransactions: transactionConstant.filter((t) => t.status === 'successful').length,
      })
    )
  }),

  // Dispute Types
  http.get(`${BASE_URL}/business/dispute-types`, () => {
    return HttpResponse.json(createApiResponse(DisputeTypesConstant))
  }),

  // Create Dispute
  http.post(`${BASE_URL}/business/create-dispute`, async ({ request }) => {
    const body = await request.json() as { dispute_type_id: string; description: string }
    return HttpResponse.json(
      createApiResponse({
        id: Date.now(),
        dispute_type_id: body.dispute_type_id,
        description: body.description,
        attachments: [],
        status: 'pending',
        updated_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      })
    )
  }),
]
