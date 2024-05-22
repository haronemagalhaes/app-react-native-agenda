import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Importe isso caso esteja usando React Navigation


export default function RegistrationScreen() {
    const [username, setUsername] = useState('');
    const [registration, setRegistration] = useState('');
    const [age, setAge] = useState('');
    const [codResponsible, setCodResponsible] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [users, setUsers] = useState([]);

    const handleRegister = () => {
        setIsSubmitting(true);
        // Simulação de registro (substituir pela lógica real)
        setTimeout(() => {
            const newUser = { username, registration, age, codResponsible };
            setUsers([...users, newUser]);
            setUsername('');
            setRegistration('');
            setAge('');
            setCodResponsible('');
            setIsSubmitting(false);
        }, 1500);
    };

    const renderUserItem = ({ item }) => (
        <View style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.username}</Text>
            <Text style={styles.tableCell}>{item.registration}</Text>
            <Text style={styles.tableCell}>{item.age}</Text>
            <Text style={styles.tableCell}>{item.codResponsible}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registro de Usuário</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Registration"
                    value={registration}
                    onChangeText={text => setRegistration(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    value={age}
                    onChangeText={text => setAge(text)}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cod Responsible"
                    value={codResponsible}
                    onChangeText={text => setCodResponsible(text)}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleRegister}
                    disabled={isSubmitting} // Desabilita o botão enquanto está submetendo
                >
                    {isSubmitting ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Ionicons name="checkmark" size={24} color="white" />
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Username</Text>
                <Text style={styles.tableHeaderText}>Registration</Text>
                <Text style={styles.tableHeaderText}>Age</Text>
                <Text style={styles.tableHeaderText}>Cod Responsible</Text>
            </View>
            <FlatList
                data={users}
                renderItem={renderUserItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<Text style={styles.noUsersText}>Nenhum usuário cadastrado</Text>}
                style={styles.userList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF', // Fundo branco
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FF1493', // Cor do título
    },
    formContainer: {
        width: '100%',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#FF1493',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        width: '100%',
        backgroundColor: '#F0F0F0',
        marginTop: 20,
    },
    tableHeaderText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        width: '100%',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
    },
    noUsersText: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 20,
    },
    userList: {
        width: '100%',
    },
});
