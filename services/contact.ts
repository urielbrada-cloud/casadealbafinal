import { supabase } from '../lib/supabase';

export const submitContactForm = async (formData: FormData, formName: string) => {
  if (!supabase) {
    console.warn('Supabase client not initialized. Falling back to default behavior.');
    return false;
  }

  const data = Object.fromEntries(formData.entries());
  
  try {
    const { error } = await supabase
      .from('contacts')
      .insert([
        {
          form_name: formName,
          name: data.name || null,
          email: data.email || null,
          phone: data.phone || null,
          message: data.message || null,
          metadata: data // Store all other fields in a JSONB column
        }
      ]);

    if (error) {
      console.error('Error inserting contact:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error submitting form to Supabase:', error);
    throw error;
  }
};
