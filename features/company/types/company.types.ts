export interface Company {
	_id: string;
	name: string;
	logo_url?: string;
	website?: string;
	industry?: string;
	company_size?: string;
	location?: string;
	about?: string;
	ownerId: string;
	isActive: boolean;
}

export interface CreateCompanyDto {
	name: string;
	logo_url?: string;
	website?: string;
	industry?: string;
	company_size?: string;
	location?: string;
	about?: string;
}
