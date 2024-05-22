import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const navigation = useNavigation();

    const handlePressAtividade = () => {
        console.log('Navegar para a tela de Atividade');
        navigation.navigate('Atividade');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Página Inicial</Text>
            <Button title="Ir para Atividade" onPress={handlePressAtividade} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FF1493',
    },
});
