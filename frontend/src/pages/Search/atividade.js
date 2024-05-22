import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importe isso caso esteja usando React Navigation

export default function Atividade() {
    const navigation = useNavigation(); // Instância da navegação, caso esteja usando React Navigation

    // Funções para lidar com os cliques nos cards
    const handlePressAgenda = () => {
        console.log('Navegar para a tela de Agenda');
        // Navegue para a tela de Agenda
        navigation.navigate('Agenda'); // Use isso caso esteja usando React Navigation
    };

    const handlePressCalendario = () => {
        console.log('Navegar para a tela de Calendário');
        // Navegue para a tela de Calendário
        navigation.navigate('Calendario'); // Use isso caso esteja usando React Navigation
    };

    const handlePressEventos = () => {
        console.log('Navegar para a tela de Eventos');
        // Navegue para a tela de Eventos
        navigation.navigate('Eventos'); // Use isso caso esteja usando React Navigation
    };

    const handlePressAlunos = () => {
        console.log('Navegar para a tela de Alunos');
        // Navegue para a tela de Alunos
        navigation.navigate('Alunos'); // Use isso caso esteja usando React Navigation
    };
    
    const handlePressAtividade = () => {
        console.log('Navegar para a tela de Atividade');
        const navigation = useNavigation();
        navigation.navigate('Atividade');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => console.log('Voltar')}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Text style={[styles.titulo, { color: '#FA1276' }]}>Agenda</Text>
                <Text style={[styles.titulo, { color: '#67C7F2' }]}>Kids</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.smallButton} onPress={handlePressAgenda}>
                    <Text style={styles.buttonText}>Agenda</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.smallButton} onPress={handlePressCalendario}>
                    <Text style={styles.buttonText}>Calendário</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.card} onPress={handlePressEventos}>
                <Ionicons name="calendar" size={30} color="#FA1276" />
                <Text style={styles.cardText}>Eventos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={handlePressAlunos}>
                <Ionicons name="people" size={30} color="#FA1276" />
                <Text style={styles.cardText}>Alunos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={handlePressAtividade}>
                <Ionicons name="clipboard" size={30} color="#FA1276" />
                <Text style={styles.cardText}>Atividade</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderColor: '#FA1276', // Cor da borda
    },
    header: {
        flexDirection: 'row',
        marginBottom: 50,
    },
    titulo: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'comic sans ms',
        textTransform: 'uppercase',
        letterSpacing: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderColor: '#FA1276', // Cor da borda
    },
    smallButton: {
        backgroundColor: '#67C7F2',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        borderColor: '#FA1276', // Cor da borda
        width: '80%',
        height: 100,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        borderColor: '#000000', // Cor da borda
        marginLeft: 10,
    },
    backButton: {
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 1,
        
    },
});
