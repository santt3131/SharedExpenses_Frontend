import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { ColorPalette, Size } from "../../../appStyles";

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  defaultValue,
  editable = true,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              {
                borderColor: error
                  ? ColorPalette.primaryRed
                  : ColorPalette.veryLightGrey,
              },
              {
                backgroundColor: editable
                  ? ColorPalette.primaryWhite
                  : ColorPalette.veryLightGrey,
              },
            ]}
          >
            <TextInput
              value={defaultValue ?? value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize={autoCapitalize ? autoCapitalize : "none"}
              placeholder={placeholder}
              placeholderTextColor={ColorPalette.primaryGray}
              style={styles.input}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              editable={editable}
            />
          </View>
          {error && (
            <Text
              style={{ color: ColorPalette.primaryRed, alignSelf: "stretch" }}
            >
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: ColorPalette.veryLightGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    height: 48,
    color: ColorPalette.primaryBlack,
    fontSize: Size.xm,
  },
});

export default CustomInput;
