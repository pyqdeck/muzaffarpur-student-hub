
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin' | 'faculty' | 'guest';
  course: 'engineering' | 'other';
  branch?: 'computer_science' | 'electronics' | 'mechanical' | 'civil' | 'electrical';
  semester?: number;
  yearOfAdmission?: number;
  profileComplete: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>;
  logout: () => void;
  loginAsGuest: () => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('mit-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - in real app, this would be API call
      if (!email.endsWith('@mitmusaffarpur.edu.in')) {
        throw new Error('Please use your college email');
      }
      
      // Mock user data
      const userData: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'student',
        course: 'engineering',
        profileComplete: false
      };
      
      setUser(userData);
      localStorage.setItem('mit-user', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    try {
      if (!userData.email?.endsWith('@mitmusaffarpur.edu.in')) {
        throw new Error('Please use your college email');
      }
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name || '',
        role: userData.role || 'student',
        course: userData.course || 'engineering',
        branch: userData.branch,
        semester: userData.semester,
        yearOfAdmission: userData.yearOfAdmission,
        profileComplete: !!(userData.branch && userData.semester)
      };
      
      setUser(newUser);
      localStorage.setItem('mit-user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const updatedUser = { 
        ...user, 
        ...updates,
        profileComplete: !!(updates.branch && updates.semester) || user.profileComplete
      };
      
      setUser(updatedUser);
      localStorage.setItem('mit-user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mit-user');
  };

  const loginAsGuest = async (): Promise<boolean> => {
    try {
      const guestUser: User = {
        id: 'guest-user',
        email: 'guest@example.com',
        name: 'Guest User',
        role: 'guest',
        course: 'other', // Or some default/generic course
        profileComplete: true, // Guest profiles are considered complete
      };
      setUser(guestUser);
      localStorage.setItem('mit-user', JSON.stringify(guestUser));
      return true;
    } catch (error) {
      console.error('Guest login error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loginAsGuest, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
