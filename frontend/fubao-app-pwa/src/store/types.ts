export interface ProfileType {
  id: number;
  is_superuser: boolean;
  email: string;
  name: string;
  date_joined: string;
  nickname: string;
  age: number | null;
  date_of_birth: string | null;
  gender: string;
  profile_img: string;
  total_fish_count: number;
  total_schedules: number;
  latest_schedule_date: string | null;
  presurvey: boolean;
}

// Location 정보를 위한 인터페이스
interface Location {
  id: number;
  address: string;
}

// Method 정보를 위한 인터페이스
interface Method {
  id: number;
  title: string;
}

// Area 정보를 위한 인터페이스
interface Area {
  id: number;
  title: string;
}

// Schedule의 전체 구조를 위한 인터페이스
export interface ScheduleType {
  id: number;
  date: string;
  location: Location;
  done: boolean;
  user: number;
  method: Method;
  area: Area;
}

// recommendation 전체 구조를 위한 인터페이스
export interface RecommendationType {
  fish_id: number;
  location_id: number;
  method_id: number;
  selected_fish: string;
  selected_location: string;
  selected_method: string;
}

export interface informationType {
  recommendation: RecommendationType;
  schedule: ScheduleType;
  profile: ProfileType;
}