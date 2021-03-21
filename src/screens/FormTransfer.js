import React, { useState, useEffect, useContext } from 'react';
import { RefreshControl, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { convertRupiah } from '../utils/convertRupiah';
import { useForm, Controller } from "react-hook-form";
import { DataStruk } from '../context/DataStruk';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
  Bank: yup.string().required(),
  NoRek: yup.number().positive().integer().required(),
  Nama: yup.string().required(),
  JumlahTransfer: yup.number().positive().integer().required(),
  Admin: yup.number().positive().integer().required()
});

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function FormTransfer({navigation}) {
  const {setData} = useContext(DataStruk);
  const [admin, setAdmin] = useState();
  const [jumlahTransfer, setJumlahTransfer] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(Number(admin) + Number(jumlahTransfer));
  }, [admin, jumlahTransfer, total]);

  const {control, handleSubmit, errors, reset} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    data.Total = total;
    setData(data);
    navigation.navigate("Print");

    // clear form
    reset();
    setAdmin(0);
    setJumlahTransfer(0);
    setTotal(0);
  };

  // handle refresh
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.viewInput}>
        <Text style={styles.text}>BANK</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
            placeholder="BANK"
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              />
              )}
          name="Bank"
          rules={{ required: true }}
          defaultValue=""
        />
        <Text style={styles.textError}>{errors.Bank?.message}</Text>
      </View>
      <View style={styles.viewInput}>
        <Text
          style={styles.text}
        >No. Rek</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              placeholder="No. Rek"
              style={styles.textInput}
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="NoRek"
          rules={{ required: true }}
          defaultValue=""
        />
        <Text style={styles.textError}>{errors.NoRek?.message}</Text>
      </View>
      <View style={styles.viewInput}>
        <Text
          style={styles.text}
        >Nama</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              placeholder="Nama"
              style={styles.textInput}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="Nama"
          rules={{ required: true }}
          defaultValue=""
        />
        <Text style={styles.textError}>{errors.Nama?.message}</Text>
      </View>
      <View style={styles.viewInput}>
        <Text
          style={styles.text}
        >Jumlah Transfer</Text>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Jumlah Transfer"
              keyboardType="numeric"
              onBlur={onBlur}
              onChangeText={value => {
                value = Number(value);
                onChange(value);
                setJumlahTransfer(value);
              }}
              value={value}
            />
          )}
          name="JumlahTransfer"
          rules={{ required: true }}
          defaultValue=""
        />
        <Text style={styles.textError}>{errors.JumlahTransfer?.message}</Text>
      </View>
      <View style={styles.viewInput}>
        <Text style={styles.text}>Admin</Text>
        <Controller
          control={control}
          render={({ onChange }) => (
            <>
              <View style={styles.viewRadio}>
                <RadioButton
                  value={10000}
                  status={ admin === 10000 ? 'checked' : 'unchecked' }
                  onPress={() => {
                    setAdmin(10000)
                    onChange(10000)
                  }}
                  />
                <Text>{convertRupiah(10000)}</Text>
              </View>
              <View style={styles.viewRadio}>
                <RadioButton
                  value={15000}
                  status={ admin === 15000 ? 'checked' : 'unchecked' }
                  onPress={() => {
                    setAdmin(15000)
                    onChange(15000)
                  }}
                />
                <Text>{convertRupiah(15000)}</Text>
              </View>
              <View style={styles.viewRadio}>
                <RadioButton
                  value={25000}
                  status={ admin === 25000 ? 'checked' : 'unchecked' }
                  onPress={() => {
                    setAdmin(25000)
                    onChange(25000)
                  }}
                />
                <Text>{convertRupiah(25000)}</Text>
              </View>
              <View style={styles.viewRadio}>
              <RadioButton
                value={50000}
                status={ admin === 50000 ? 'checked' : 'unchecked' }
                onPress={() => {
                  setAdmin(50000)
                  onChange(50000)
                }}
              />
              <Text>{convertRupiah(50000)}</Text>
            </View>
            </>
          )}
          name="Admin"
          rules={{ required: true }}
          defaultValue=""
        />
        <Text style={styles.textError}>{errors.Admin?.message}</Text>
      </View>
      <View style={styles.viewInput}>
        <Text
          style={styles.text}
        >Total</Text>
        <Text style={styles.textTotal}>{convertRupiah(total)}</Text>
      </View>
      <Button 
        title="CETAK"
        onPress={handleSubmit(onSubmit)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  viewInput: {
    marginBottom: 10
  },
  text: {
    fontWeight: 500,
    marginBottom: 5
  },
  textInput: {
    borderWidth: 1,
    borderColor: "black",
    marginTop: 3,
    padding: 10
  },
  textTotal: {
    marginLeft: 10
  },
  viewRadio: {
    flexDirection: "row",
    alignItems: "center"
  },
  textError: {
    color: "crimson"
  }
});
