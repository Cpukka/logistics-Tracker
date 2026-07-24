import { supabase, TABLES } from '../lib/supabase'
import { Shipment, CreateShipmentFormData, UpdateShipmentFormData } from '../types'

export class ShipmentService {
  static async getAll(filters?: {
    status?: string
    driverId?: string
    dateRange?: { start: Date; end: Date }
  }) {
    let query = supabase
      .from(TABLES.SHIPMENTS)
      .select(`
        *,
        driver:drivers(*),
        customer:customers(*)
      `)

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }

    if (filters?.driverId) {
      query = query.eq('driver_id', filters.driverId)
    }

    if (filters?.dateRange) {
      query = query
        .gte('created_at', filters.dateRange.start.toISOString())
        .lte('created_at', filters.dateRange.end.toISOString())
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) throw error
    return data as Shipment[]
  }

  static async getById(id: string) {
    const { data, error } = await supabase
      .from(TABLES.SHIPMENTS)
      .select(`
        *,
        driver:drivers(*),
        customer:customers(*),
        events:delivery_events(*)
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    return data as Shipment
  }

  static async create(shipmentData: CreateShipmentFormData) {
    const { data, error } = await supabase
      .from(TABLES.SHIPMENTS)
      .insert([{
        ...shipmentData,
        tracking_number: `LTK${Date.now()}${Math.floor(Math.random() * 1000)}`,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      .select()
      .single()

    if (error) throw error
    return data as Shipment
  }

  static async update(id: string, updates: UpdateShipmentFormData) {
    const { data, error } = await supabase
      .from(TABLES.SHIPMENTS)
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Shipment
  }

  static async addEvent(shipmentId: string, event: {
    type: string
    location: any
    description: string
  }) {
    const { data, error } = await supabase
      .from(TABLES.DELIVERY_EVENTS)
      .insert([{
        shipment_id: shipmentId,
        ...event,
        timestamp: new Date().toISOString(),
      }])
      .select()
      .single()

    if (error) throw error
    return data
  }
}