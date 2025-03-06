'use client'

import { useState, useEffect } from 'react';
import { useVeltClient } from '@veltdev/react';
import { UserData } from '@/app/types/User';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const pastelSaturation = 70;
  const pastelLightness = 80;
  return `hsl(${hue}, ${pastelSaturation}%, ${pastelLightness}%)`;
};

const getContrastColor = (backgroundColor: string) => {
  const hsl = backgroundColor.match(/\d+/g)?.map(Number);
  if (!hsl) return '#000000';
  
  const lightness = hsl[2];
  return lightness > 70 ? '#000000' : '#ffffff';
};

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' })
});

export function UserAuth() {
  const { client } = useVeltClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: ''
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthenticated(!!localStorage.getItem('userData'));
    }
  }, []);

  useEffect(() => {
    const initializeUser = async () => {
      if (typeof window === 'undefined') return;
      
      const savedUser = localStorage.getItem('userData');
      if (savedUser && client) {
        const userData: UserData = JSON.parse(savedUser);
        await client.identify(userData as UserData);
        client.setDocument('tiptap-collaborative-emails', {documentName: 'Collaborative Emails'});
      }
    };

    if (client) {
      initializeUser();
    }
  }, [client]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!client) return;

    const { name, email } = values;
    const backgroundColor = generateRandomColor();
    
    const userData: UserData = {
      userId: email,
      organizationId: 'default-organization',
      name,
      email,
      color: backgroundColor,
      textColor: getContrastColor(backgroundColor)
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    await client.identify(userData as UserData);
    client.setDocument('tiptap-collaborative-emails', {documentName: 'Collaborative Emails'});
    setIsAuthenticated(true);
  };

  if (isAuthenticated) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md shadow-lg animate-in fade-in-50 zoom-in-90 duration-300">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome! 👋</CardTitle>
          <CardDescription className="text-center">
            Please introduce yourself to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-2">
                Join Now
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
} 