import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationScreen() {
    const [searchText, setSearchText] = useState('');
    const notifications = [
        { 
            id: 1,
            icon: '📚',
            message: 'Lembrete: Não esqueça de trazer o livro de história para a aula hoje.',
        },
        {
            id: 2,
            icon: '🎨',
            message: 'Novo desafio de arte! Desenhe sua família e traga para a exposição na próxima semana.',
        },
        {
            id: 3,
            icon: '🎂',
            message: 'Aniversário da Ana: Vamos comemorar na sala de aula com bolo e brincadeiras às 14h.',
        },
        {
            id: 4,
            icon: '👨‍👩‍👧‍👦',
            message: 'Lembrete: O ônibus escolar terá um atraso de 10 minutos hoje devido a obras na rua.',
        },
    ];

    const filteredNotifications = notifications.filter(notification =>
        notification.message.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleNotificationPress = (notification) => {
        console.log('Notificação pressionada:', notification);
        // Adicione a lógica para lidar com o pressionamento da notificação aqui
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => console.log('Voltar')}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>🎉 Notificações 🎉</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar notificações..."
                value={searchText}
                onChangeText={setSearchText}
            />
            <ScrollView>
                {filteredNotifications.map(notification => (
                    <TouchableOpacity 
                        key={notification.id} 
                        style={styles.notification} 
                        onPress={() => handleNotificationPress(notification)}
                    >
                        <Text style={styles.notificationIcon}>{notification.icon}</Text>
                        <Text style={styles.notificationText}>{notification.message}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000000',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    notification: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#FA1276',
    },
    notificationIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    notificationText: {
        flex: 1,
        fontSize: 18,
        lineHeight: 24,
        color: '#000000',
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 1,
    },
});
