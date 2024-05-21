export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined } 
  | Json[]

export type Database = {
  public: {
    Tables: {
      groupMessages0: {
        Row: {
          content: string | null
          dayDate: string | null
          hourMinDate: string | null
          id: string
          receiverId: string | null
          senderId: string | null
          senderUsername: string | null
        }
        Insert: {
          content?: string | null
          dayDate?: string | null
          hourMinDate?: string | null
          id: string
          receiverId?: string | null
          senderId?: string | null
          senderUsername?: string | null
        }
        Update: {
          content?: string | null
          dayDate?: string | null
          hourMinDate?: string | null
          id?: string
          receiverId?: string | null
          senderId?: string | null
          senderUsername?: string | null
        }
        Relationships: []
      }
      groups0: {
        Row: {
          admin: string | null
          id: string
          members: Json[] | null
          name: string | null
        }
        Insert: {
          admin?: string | null
          id: string
          members?: Json[] | null
          name?: string | null
        }
        Update: {
          admin?: string | null
          id?: string
          members?: Json[] | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_admin_fkey"
            columns: ["admin"]
            isOneToOne: false
            referencedRelation: "users0"
            referencedColumns: ["username"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string | null
          id: number
          message: string | null
          sender_id: number | null
          team_id: number | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          message?: string | null
          sender_id?: number | null
          team_id?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          message?: string | null
          sender_id?: number | null
          team_id?: number | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      messages0: {
        Row: {
          content: string | null
          dayDate: string | null
          hourMinDate: string | null
          id: string
          receiverId: string | null
          senderId: string | null
          senderUsername: string | null
        }
        Insert: {
          content?: string | null
          dayDate?: string | null
          hourMinDate?: string | null
          id: string
          receiverId?: string | null
          senderId?: string | null
          senderUsername?: string | null
        }
        Update: {
          content?: string | null
          dayDate?: string | null
          hourMinDate?: string | null
          id?: string
          receiverId?: string | null
          senderId?: string | null
          senderUsername?: string | null
        }
        Relationships: []
      }
      teams: {
        Row: {
          avatar: string | null
          created_at: string | null
          id: number
          name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          id?: number
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      teams_members: {
        Row: {
          created_at: string | null
          id: number
          role: string | null
          team_id: number
          "updated-at": string | null
          user_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          role?: string | null
          team_id: number
          "updated-at"?: string | null
          user_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          role?: string | null
          team_id?: number
          "updated-at"?: string | null
          user_id?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: number
          password: string | null
          status: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          password?: string | null
          status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: number
          password?: string | null
          status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      users0: {
        Row: {
          id: string
          password: string | null
          username: string
        }
        Insert: {
          id: string
          password?: string | null
          username: string
        }
        Update: {
          id?: string
          password?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
