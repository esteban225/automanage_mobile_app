import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

const UserHome = () => {
    return (
        <Text>
            users
        </Text>
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