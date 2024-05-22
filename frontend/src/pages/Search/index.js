import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = () => {
        setIsSearching(true);
        // Simulação de busca (substituir pela lógica real)
        setTimeout(() => {
            const fakeResults = Array.from({ length: 10 }, (_, i) => `Resultado ${i + 1}`);
            setSearchResults(fakeResults);
            setIsSearching(false);
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pesquisar</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite aqui..."
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                    autoFocus={true}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={handleSearch}
                    disabled={isSearching || !searchQuery} // Desabilita o botão se estiver buscando ou se a consulta estiver vazia
                >
                    {isSearching ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : (
                        <Ionicons name="search" size={24} color="white" />
                    )}
                </TouchableOpacity>
            </View>
            {isSearching ? (
                <ActivityIndicator style={styles.spinner} size="large" color="#FF1493" />
            ) : (
                <FlatList
                    data={searchResults}
                    renderItem={({ item }) => <Text style={styles.resultItem}>{item}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<Text style={styles.noResultsText}>Nenhum resultado encontrado</Text>}
                />
            )}
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: '#FF1493',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spinner: {
        marginTop: 20,
    },
    resultItem: {
        fontSize: 16,
        marginBottom: 10,
    },
    noResultsText: {
        fontSize: 16,
        marginTop: 20,
        fontStyle: 'italic',
    },
});
