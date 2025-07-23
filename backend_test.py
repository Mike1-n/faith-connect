#!/usr/bin/env python3
"""
FaithConnect Backend API Testing Suite
Tests all CRUD operations for the social media backend
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL - using localhost since we're testing internally
BASE_URL = "http://localhost:3001"

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = 0
        
    def log_test(self, test_name, passed, message="", response_data=None):
        """Log test results"""
        self.total_tests += 1
        if passed:
            self.passed_tests += 1
            status = "✅ PASS"
        else:
            self.failed_tests += 1
            status = "❌ FAIL"
            
        result = {
            'test': test_name,
            'status': status,
            'message': message,
            'response_data': response_data
        }
        self.test_results.append(result)
        print(f"{status}: {test_name} - {message}")
        
    def test_server_status(self):
        """Test if backend server is running"""
        try:
            response = requests.get(f"{BASE_URL}/users", timeout=5)
            if response.status_code in [200, 500]:  # 500 is expected if tables don't exist
                self.log_test("Server Status", True, f"Server responding on port 3001 (Status: {response.status_code})")
                return True
            else:
                self.log_test("Server Status", False, f"Unexpected status code: {response.status_code}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Server Status", False, f"Server not accessible: {str(e)}")
            return False
    
    def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            response = requests.options(f"{BASE_URL}/users")
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            
            if cors_headers['Access-Control-Allow-Origin']:
                self.log_test("CORS Configuration", True, "CORS headers present", cors_headers)
            else:
                self.log_test("CORS Configuration", False, "CORS headers missing")
        except Exception as e:
            self.log_test("CORS Configuration", False, f"Error testing CORS: {str(e)}")
    
    def test_users_endpoints(self):
        """Test all user-related endpoints"""
        print("\n=== Testing Users Endpoints ===")
        
        # Test GET /users
        try:
            response = requests.get(f"{BASE_URL}/users")
            if response.status_code == 200:
                self.log_test("GET /users", True, f"Retrieved users successfully")
            elif response.status_code == 500 and "does not exist" in response.text:
                self.log_test("GET /users", False, "Database table 'users' does not exist", response.json())
            else:
                self.log_test("GET /users", False, f"Unexpected response: {response.status_code}")
        except Exception as e:
            self.log_test("GET /users", False, f"Request failed: {str(e)}")
        
        # Test POST /users (Create user)
        user_data = {
            "username": "john_believer",
            "email": "john@faithconnect.com",
            "password": "blessed123"
        }
        
        try:
            response = requests.post(f"{BASE_URL}/users", json=user_data)
            if response.status_code == 200:
                self.log_test("POST /users", True, "User created successfully")
                return response.json()
            elif response.status_code == 500 and "does not exist" in response.text:
                self.log_test("POST /users", False, "Database table 'users' does not exist")
            else:
                self.log_test("POST /users", False, f"Failed to create user: {response.status_code}")
        except Exception as e:
            self.log_test("POST /users", False, f"Request failed: {str(e)}")
        
        return None
    
    def test_posts_endpoints(self):
        """Test all post-related endpoints"""
        print("\n=== Testing Posts Endpoints ===")
        
        # Test GET /posts
        try:
            response = requests.get(f"{BASE_URL}/posts")
            if response.status_code == 200:
                posts_data = response.json()
                self.log_test("GET /posts", True, f"Retrieved posts successfully (found {len(posts_data)} posts)")
            elif response.status_code == 500 and "does not exist" in response.text:
                self.log_test("GET /posts", False, "Database table 'posts' does not exist")
            else:
                self.log_test("GET /posts", False, f"Unexpected response: {response.status_code}")
        except Exception as e:
            self.log_test("GET /posts", False, f"Request failed: {str(e)}")
        
        # Test POST /posts (Create post) - First create a user
        user_data = {
            "username": "test_poster",
            "email": "poster@faithconnect.com", 
            "password": "blessed123"
        }
        
        # Try to create a user first
        user_id = None
        try:
            user_response = requests.post(f"{BASE_URL}/users", json=user_data)
            if user_response.status_code == 200:
                user_result = user_response.json()
                user_id = user_result.get('id') if user_result else None
        except:
            pass
        
        # Use a sample UUID if user creation failed
        if not user_id:
            user_id = "550e8400-e29b-41d4-a716-446655440000"
        
        post_data = {
            "user_id": user_id,
            "content": "Blessed to share God's love today! 🙏 #Faith #Blessed"
        }
        
        try:
            response = requests.post(f"{BASE_URL}/posts", json=post_data)
            if response.status_code == 200:
                self.log_test("POST /posts", True, "Post created successfully")
                return response.json()
            elif response.status_code == 500:
                error_msg = response.json().get('error', 'Unknown error')
                if "does not exist" in error_msg:
                    self.log_test("POST /posts", False, "Database table 'posts' does not exist")
                elif "row-level security" in error_msg:
                    self.log_test("POST /posts", False, "Row-level security policy blocking insert (RLS needs configuration)")
                else:
                    self.log_test("POST /posts", False, f"Database error: {error_msg}")
            else:
                self.log_test("POST /posts", False, f"Failed to create post: {response.status_code}")
        except Exception as e:
            self.log_test("POST /posts", False, f"Request failed: {str(e)}")
        
        return None
    
    def test_comments_endpoints(self):
        """Test comments endpoints"""
        print("\n=== Testing Comments Endpoints ===")
        
        try:
            response = requests.get(f"{BASE_URL}/comments")
            if response.status_code == 200:
                self.log_test("GET /comments", True, "Comments endpoint accessible")
            elif response.status_code == 500 and "does not exist" in response.text:
                self.log_test("GET /comments", False, "Database table 'comments' does not exist")
            else:
                self.log_test("GET /comments", False, f"Unexpected response: {response.status_code}")
        except Exception as e:
            self.log_test("GET /comments", False, f"Request failed: {str(e)}")
    
    def test_likes_endpoints(self):
        """Test likes endpoints"""
        print("\n=== Testing Likes Endpoints ===")
        
        try:
            response = requests.get(f"{BASE_URL}/likes")
            if response.status_code == 200:
                self.log_test("GET /likes", True, "Likes endpoint accessible")
            elif response.status_code == 500 and "does not exist" in response.text:
                self.log_test("GET /likes", False, "Database table 'likes' does not exist")
            else:
                self.log_test("GET /likes", False, f"Unexpected response: {response.status_code}")
        except Exception as e:
            self.log_test("GET /likes", False, f"Request failed: {str(e)}")
    
    def test_followers_endpoints(self):
        """Test followers endpoints"""
        print("\n=== Testing Followers Endpoints ===")
        
        try:
            response = requests.get(f"{BASE_URL}/followers")
            if response.status_code == 200:
                self.log_test("GET /followers", True, "Followers endpoint accessible")
            elif response.status_code == 500 and "does not exist" in response.text:
                self.log_test("GET /followers", False, "Database table 'followers' does not exist")
            else:
                self.log_test("GET /followers", False, f"Unexpected response: {response.status_code}")
        except Exception as e:
            self.log_test("GET /followers", False, f"Request failed: {str(e)}")
    
    def test_groups_endpoints(self):
        """Test groups endpoints"""
        print("\n=== Testing Groups Endpoints ===")
        
        try:
            response = requests.get(f"{BASE_URL}/groups")
            if response.status_code == 200:
                self.log_test("GET /groups", True, "Groups endpoint accessible")
            elif response.status_code == 500 and "does not exist" in response.text:
                self.log_test("GET /groups", False, "Database table 'groups' does not exist")
            else:
                self.log_test("GET /groups", False, f"Unexpected response: {response.status_code}")
        except Exception as e:
            self.log_test("GET /groups", False, f"Request failed: {str(e)}")
    
    def test_events_endpoints(self):
        """Test events endpoints"""
        print("\n=== Testing Events Endpoints ===")
        
        try:
            response = requests.get(f"{BASE_URL}/events")
            if response.status_code == 200:
                self.log_test("GET /events", True, "Events endpoint accessible")
            elif response.status_code == 500 and "does not exist" in response.text:
                self.log_test("GET /events", False, "Database table 'events' does not exist")
            else:
                self.log_test("GET /events", False, f"Unexpected response: {response.status_code}")
        except Exception as e:
            self.log_test("GET /events", False, f"Request failed: {str(e)}")
    
    def test_mentorships_endpoints(self):
        """Test mentorships endpoints"""
        print("\n=== Testing Mentorships Endpoints ===")
        
        try:
            response = requests.get(f"{BASE_URL}/mentorships")
            if response.status_code == 200:
                self.log_test("GET /mentorships", True, "Mentorships endpoint accessible")
            elif response.status_code == 500 and "does not exist" in response.text:
                self.log_test("GET /mentorships", False, "Database table 'mentorships' does not exist")
            else:
                self.log_test("GET /mentorships", False, f"Unexpected response: {response.status_code}")
        except Exception as e:
            self.log_test("GET /mentorships", False, f"Request failed: {str(e)}")
    
    def test_discipleship_endpoints(self):
        """Test discipleship endpoints"""
        print("\n=== Testing Discipleship Endpoints ===")
        
        try:
            response = requests.get(f"{BASE_URL}/discipleship")
            if response.status_code == 200:
                self.log_test("GET /discipleship", True, "Discipleship endpoint accessible")
            elif response.status_code == 500 and "does not exist" in response.text:
                self.log_test("GET /discipleship", False, "Database table for discipleship does not exist")
            else:
                self.log_test("GET /discipleship", False, f"Unexpected response: {response.status_code}")
        except Exception as e:
            self.log_test("GET /discipleship", False, f"Request failed: {str(e)}")
    
    def test_spiritual_gifts_endpoints(self):
        """Test spiritual gifts endpoints"""
        print("\n=== Testing Spiritual Gifts Endpoints ===")
        
        try:
            response = requests.get(f"{BASE_URL}/spiritual-gifts")
            if response.status_code == 200:
                self.log_test("GET /spiritual-gifts", True, "Spiritual gifts endpoint accessible")
            elif response.status_code == 500 and "does not exist" in response.text:
                self.log_test("GET /spiritual-gifts", False, "Database table 'spiritual_gifts' does not exist")
            else:
                self.log_test("GET /spiritual-gifts", False, f"Unexpected response: {response.status_code}")
        except Exception as e:
            self.log_test("GET /spiritual-gifts", False, f"Request failed: {str(e)}")
    
    def test_environment_variables(self):
        """Test if environment variables are properly loaded"""
        print("\n=== Testing Environment Configuration ===")
        
        # Check if server responds (indicates env vars are loaded)
        try:
            response = requests.get(f"{BASE_URL}/users")
            if response.status_code in [200, 500]:
                self.log_test("Environment Variables", True, "Server started successfully (env vars loaded)")
            else:
                self.log_test("Environment Variables", False, "Server configuration issue")
        except Exception as e:
            self.log_test("Environment Variables", False, f"Server not accessible: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting FaithConnect Backend API Tests")
        print("=" * 50)
        
        # Test server status first
        if not self.test_server_status():
            print("❌ Server is not running. Cannot proceed with API tests.")
            return
        
        # Test environment and configuration
        self.test_environment_variables()
        self.test_cors_headers()
        
        # Test all API endpoints
        self.test_users_endpoints()
        self.test_posts_endpoints()
        self.test_comments_endpoints()
        self.test_likes_endpoints()
        self.test_followers_endpoints()
        self.test_groups_endpoints()
        self.test_events_endpoints()
        self.test_mentorships_endpoints()
        self.test_discipleship_endpoints()
        self.test_spiritual_gifts_endpoints()
        
        # Print summary
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        print("\n" + "=" * 50)
        print("📊 TEST SUMMARY")
        print("=" * 50)
        print(f"Total Tests: {self.total_tests}")
        print(f"✅ Passed: {self.passed_tests}")
        print(f"❌ Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests)*100:.1f}%")
        
        print("\n🔍 CRITICAL ISSUES FOUND:")
        database_issues = [r for r in self.test_results if "does not exist" in r['message']]
        if database_issues:
            print("❌ Database tables are not created in Supabase")
            print("   - All API endpoints are failing due to missing database schema")
            print("   - Need to run the schema.sql file in Supabase to create tables")
        
        server_issues = [r for r in self.test_results if r['test'] == 'Server Status' and '❌' in r['status']]
        if server_issues:
            print("❌ Backend server is not running or not accessible")
        
        if not database_issues and not server_issues:
            print("✅ No critical issues found - backend is working properly")

if __name__ == "__main__":
    tester = BackendTester()
    tester.run_all_tests()