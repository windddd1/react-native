import React,{ useState, useEffect, useMemo } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity } from 'react-native'
import { Formik } from 'formik';
import DissmissKeyboardView from '../components/DissmissKeyboardView'
import * as Yup from "yup"
import InputWithYup from '../components/InputWithYup'


const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    flex: {
        flex:1,
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    aglinCenter: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#D4E7FE",
        flex:1
    },
    button: {
        height:50,
        width:width*0.85,
        backgroundColor:'#272F5E',
        borderRadius:12,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    contentButton: {
        color:'#FFFFFF',
        fontSize:20
    },
    input: {
        borderBottomColor:'#272F5E',
        borderBottomWidth:1.5,
        marginTop:20
    }
})

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(5, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    location: Yup.string()
        .min(5, 'Too Short!')
        .required('Required'),
    teacher: Yup.string()
        .min(5, 'Too Short!')
        .required('Required'),
})


export default Task = (props) => {

    const [data,setData] = useState({name:'',location:'',teacher:''})

    const submit = (values) => {
        console.log(values)
    }

    return (
        <DissmissKeyboardView style={styles.aglinCenter} >
            <Formik  
                validationSchema={SignupSchema}
                initialValues={data}
                onSubmit={submit}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={{justifyContent: 'center',alignItems: 'center',}}>
                        <InputWithYup label="Name" formikKey="name" value={values.name} handleChange={handleChange} handleBlur={handleBlur} error={errors.name} touched={touched.name}/>
                        <InputWithYup label="Location" 
                            formikKey="location" 
                            value={values.location} 
                            handleChange={handleChange} 
                            handleBlur={handleBlur} 
                            error={errors.location} 
                            touched={touched.location}/>
                        <InputWithYup label="Teacher" 
                            formikKey="teacher" 
                            value={values.teacher} 
                            handleChange={handleChange} 
                            handleBlur={handleBlur} 
                            error={errors.teacher} 
                            touched={touched.teacher}/>
                        <TouchableOpacity  activeOpacity={0.9} style={[styles.button]} onPress={handleSubmit}>
                            <View>
                                <Text style={[styles.contentButton]} >Add </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </DissmissKeyboardView>
    )
}

