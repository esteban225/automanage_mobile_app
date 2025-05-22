import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const AdminHome: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Admin Dashboard</Text>
            <View style={styles.section}>
                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardTitle}>Manage Users</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardTitle}>View Reports</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <Text style={styles.cardTitle}>Settings</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
        backgroundColor: '#f5f6fa',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 24,
        color: '#222f3e',
    },
    section: {
        width: '100%',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 12,
        marginVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 18,
        color: '#222f3e',
        fontWeight: '600',
    },
});

export default AdminHome;