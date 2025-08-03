import { supabase } from '../config/supabase';
import { UserProfile, FinancialData, Badge, LearningModule } from '../types';

export class DatabaseService {
  // User Profile Management
  async saveUserProfile(profile: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: profile.id,
          name: profile.name,
          persona_id: profile.persona?.id,
          level: profile.level,
          experience: profile.experience,
          streak_days: profile.streakDays,
          total_saved: profile.totalSaved,
          preferences: profile.preferences
        })
        .select()
        .single();

      if (error) throw error;
      return this.mapToUserProfile(data);
    } catch (error) {
      console.error('Error saving user profile:', error);
      return null;
    }
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return this.mapToUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  // Financial Data Management
  async saveFinancialData(userId: string, financialData: FinancialData): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('financial_data')
        .upsert({
          user_id: userId,
          monthly_income: financialData.monthlyIncome,
          expenses: financialData.expenses,
          emergency_fund: financialData.emergencyFund,
          current_savings: financialData.currentSavings
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving financial data:', error);
      return false;
    }
  }

  async getFinancialData(userId: string): Promise<FinancialData | null> {
    try {
      const { data, error } = await supabase
        .from('financial_data')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      return {
        monthlyIncome: data.monthly_income,
        expenses: data.expenses,
        emergencyFund: data.emergency_fund,
        currentSavings: data.current_savings
      };
    } catch (error) {
      console.error('Error fetching financial data:', error);
      return null;
    }
  }

  // Badge Management
  async unlockBadge(userId: string, badge: Badge): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_badges')
        .insert({
          user_id: userId,
          badge_id: badge.id,
          unlocked_at: badge.unlockedAt.toISOString()
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error unlocking badge:', error);
      return false;
    }
  }

  async getUserBadges(userId: string): Promise<Badge[]> {
    try {
      const { data, error } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data.map(this.mapToBadge);
    } catch (error) {
      console.error('Error fetching user badges:', error);
      return [];
    }
  }

  // Learning Progress Management
  async saveLearningProgress(userId: string, moduleId: string, completed: boolean, score: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('learning_progress')
        .upsert({
          user_id: userId,
          module_id: moduleId,
          completed,
          score,
          completed_at: new Date().toISOString()
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving learning progress:', error);
      return false;
    }
  }

  async getLearningProgress(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching learning progress:', error);
      return [];
    }
  }

  // AI Conversation Management
  async saveConversation(userId: string, conversationData: any): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('ai_conversations')
        .upsert({
          user_id: userId,
          conversation_data: conversationData
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving conversation:', error);
      return false;
    }
  }

  // Data Export
  async exportUserData(userId: string): Promise<any> {
    try {
      const [profile, financialData, badges, learningProgress, conversations] = await Promise.all([
        this.getUserProfile(userId),
        this.getFinancialData(userId),
        this.getUserBadges(userId),
        this.getLearningProgress(userId),
        supabase.from('ai_conversations').select('*').eq('user_id', userId)
      ]);

      return {
        profile,
        financialData,
        badges,
        learningProgress,
        conversations: conversations.data
      };
    } catch (error) {
      console.error('Error exporting user data:', error);
      return null;
    }
  }

  // Data Deletion
  async deleteUserData(userId: string): Promise<boolean> {
    try {
      await Promise.all([
        supabase.from('user_profiles').delete().eq('user_id', userId),
        supabase.from('financial_data').delete().eq('user_id', userId),
        supabase.from('user_badges').delete().eq('user_id', userId),
        supabase.from('learning_progress').delete().eq('user_id', userId),
        supabase.from('ai_conversations').delete().eq('user_id', userId)
      ]);

      return true;
    } catch (error) {
      console.error('Error deleting user data:', error);
      return false;
    }
  }

  // Helper methods
  private mapToUserProfile(data: any): UserProfile {
    // Implementation would map database fields to UserProfile interface
    return data as UserProfile;
  }

  private mapToBadge(data: any): Badge {
    return {
      id: data.badge_id,
      name: '', // Would need to join with badges table
      description: '',
      icon: '',
      unlockedAt: new Date(data.unlocked_at),
      category: 'milestone'
    };
  }
}

export const databaseService = new DatabaseService();