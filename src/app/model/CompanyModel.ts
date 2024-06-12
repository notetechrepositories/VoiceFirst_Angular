export interface CompanyModel {
    company_id?: number;
    user_id?:number;
    company_name?: string;
    address?: string;
    country?: string;
    region?: string;
    sub_region?: string;
    place?: string;
    status?:string;
    logo_media_history_id?: number;
    verification_media_history_id?: number;
    logo_media_path?: string;
    verification_media_path?: string;
    latitude?: number;
    longitude?: number;
    pincode?: string;
    updated_by?: number;
    email?: string;
    phone_number?: string;
    is_active?: number;
    is_delete?: number;
    updated_date?: string;
    update_user_name?: string;
}