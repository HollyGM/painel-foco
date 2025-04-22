import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import { scheduleDailyReminder } from './utils/notifications';

const days = [
  {
    title: 'DIA 1 – Aterrisar na Realidade',
    tasks: [
      'Anotar principais ameaças reais e o que está sob controle',
      'Gravar áudio de desabafo + reflexão',
      'Fazer 1 ação mínima (ex: abrir fatura)',
    ],
    phrase: 'Não é colapso. É ponto zero para recomeçar.',
  },
  {
    title: 'DIA 2 – Movimento Antes de Motivação',
    tasks: [
      'Escolher uma tarefa profissional simples com impacto',
      'Usar timer de 25 min e fazer sem interrupção',
      'Listar ações de baixa energia possíveis',
    ],
    phrase: 'Não preciso estar inspirado. Só em movimento.',
  },
  {
    title: 'DIA 3 – Reconectar com Seu Valor',
    tasks: [
      'Escrever: “Por que me tornei advogado?”',
      'Gravar vídeo de 1 minuto com dica prática',
      'Contatar cliente ou colega que confia em você',
    ],
    phrase: 'Sou advogado porque acredito que o Direito pode proteger.',
  },
  {
    title: 'DIA 4 – Ordem Interna Realista',
    tasks: [
      'Criar Quadro de Prioridades (vermelho, amarelo, verde)',
      'Planejar semana com 2 tarefas/dia',
      'Enviar mensagem a possível parceiro ou cliente',
    ],
    phrase: 'Não preciso fazer tudo. Só o que importa agora.',
  },
  {
    title: 'DIA 5 – Compromisso com a Esperança',
    tasks: [
      'Escrever 3 frases-diretriz para si mesmo',
      'Listar 3 possíveis fontes de receita',
      'Montar o “Quadro da Esperança Concreta”',
    ],
    phrase: 'Estou vivo — e isso me dá a chance de tentar de novo.',
  },
];

export default function App() {
  const [checked, setChecked] = useState({});

  useEffect(() => {
    scheduleDailyReminder(); // Agenda notificação diária às 8h
  }, []);

  const toggleTask = (dayIndex, taskIndex) => {
    const key = `${dayIndex}-${taskIndex}`;
    setChecked({ ...checked, [key]: !checked[key] });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Painel de Foco - Thiago A.</Text>
      {days.map((day, dayIndex) => (
        <View key={day.title} style={styles.card}>
          <Text style={styles.dayTitle}>{day.title}</Text>
          <Text style={styles.phrase}>💬 {day.phrase}</Text>
          {day.tasks.map((task, taskIndex) => {
            const key = `${dayIndex}-${taskIndex}`;
            return (
              <View key={key} style={styles.taskContainer}>
                <Button
                  title={checked[key] ? '✅ ' + task : task}
                  onPress={() => toggleTask(dayIndex, taskIndex)}
                  color={checked[key] ? '#28a745' : '#007bff'}
                />
              </View>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    margin: 12,
    borderRadius: 10,
    padding: 16,
    elevation: 4,
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  phrase: {
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#555',
  },
  taskContainer: {
    marginBottom: 8,
  },
});
