import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

const UserHome = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Welcome to Automanage!</Text>
                <Text style={styles.subtitle}>Your Dashboard</Text>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>View Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Manage Vehicles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Service History</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <Text style={styles.activityText}>No recent activity.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    content: { padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#222' },
    subtitle: { fontSize: 18, color: '#555', marginBottom: 20 },
    section: { marginBottom: 30 },
    sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#333' },
    button: {
        backgroundColor: '#007bff',
        padding: 14,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center'
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
    activityText: { color: '#888', fontSize: 14 }
});

export default UserHome;