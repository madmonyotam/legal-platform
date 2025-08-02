export interface AuthUser {
    uid: string;
    role: 'owner' | 'lawyer' | 'admin' | 'intern';
    officeId: string;
}