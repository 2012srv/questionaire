import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router';

import * as yup from 'yup';
import { useFormik } from 'formik';

import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, Card, CardContent, CircularProgress, Grid, Step, StepLabel, Stepper, TextField, Checkbox, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormGroup, FormHelperText, Divider } from "@mui/material";

import FormStep from "../../components/FormStep/FormStep";

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

const allFields = [
    {
        name: 'Lorem ipsum',
        desc: 'Consectetur adipiscing elit',
        fields: [
            {
                name: 'field1',
                q: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
                type: 'text',
                qIndex: 1

            },
            {
                name: 'field2',
                q: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor?',
                type: 'radio',
                options: ['option1', 'option2', 'option3', 'option4'],
                qIndex: 2
            },
            {
                name: 'field3',
                q: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip?',
                type: 'checkbox',
                options: ['option1', 'option2', 'option3', 'option4'],
                qIndex: 3
            }
        ]
    },
    {
        name: 'Adipiscing',
        desc: 'Consectetur adipiscing elit',
        fields: [
            {
                name: 'field11',
                q: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
                type: 'text',
                qIndex: 4
            },
            {
                name: 'field12',
                q: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
                type: 'textarea',
                qIndex: 4
            },
        ]
    },
    {
        name: 'Dolore magna',
        desc: 'Consectetur adipiscing elit',
        fields: [
            {
                name: 'field21',
                q: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
                type: 'text',
                qIndex: 5
            },
        ]
    },
    {
        name: 'Tempor incididunt',
        desc: 'Consectetur adipiscing elit',
        fields: [
            {
                name: 'field31',
                q: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
                type: 'text',
                qIndex: 6
            },
        ]
    }
];

const CheckRadioBox = styled(Box)(({ theme }) => {
    // console.log(theme);
    return ({
        border: '1px solid ' + theme.palette.primary[50],
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
        borderRadius: theme.shape.borderRadius
    })
});

const getAllValues = () => {
    let allValues = {};
    allFields.forEach(form => {
        form.fields.forEach(item => {
            if (item.type === 'checkbox') {
                const arrayValue = [];
                allValues = { ...allValues, [item.name]: arrayValue }
            } else {
                allValues = { ...allValues, [item.name]: '' }
            }
        });
    });
    return allValues;
}

const Questionnaire = (props) => {
    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const myTheme = useTheme();
    const navigate = useNavigate();

    const isLastStep = () => {
        return step === allFields.length - 1;
    }

    const schema = allFields[step]['fields'].reduce((acc, opt) => {
        if (opt.type === 'checkbox') {
            acc[opt.name] = yup.array().min(1);
        } else {
            acc[opt.name] = yup.string().required();
        }
        return acc;
    }, {});

    const formik = useFormik({
        initialValues: getAllValues(),
        validationSchema: yup.object(schema),
        onSubmit: async (values, helpers) => {
            if (isLastStep()) {
                setSubmitting(true);
                await sleep(3000);
                setSubmitting(false);
                navigate('/dashboard/apps')
                // alert(JSON.stringify(values, null, 2));
            } else {
                // console.log('test');
                setStep((s) => s + 1);
                helpers.setTouched({});
            }
        }
    });

    // console.log(formik.values);

    useEffect(() => {
    }, []);

    const selectProperFields = (field, formik) => {
        let fld = null;
        if (field.type === 'text') {
            fld = <Grid container spacing={2}>
                <Grid item xs={12} md={6} marginTop={0.5}>
                    <TextField
                        fullWidth
                        id={field.name}
                        name={field.name}
                        value={formik.values[field.name]}
                        onChange={formik.handleChange}
                        error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                        helperText={formik.touched[field.name] && formik.errors[field.name]}
                    />
                </Grid>
            </Grid>
        } else if (field.type === 'textarea') {
            fld = <Grid container spacing={2}>
                <Grid item xs={12} md={6} marginTop={0.5}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        id={field.name}
                        name={field.name}
                        value={formik.values[field.name]}
                        onChange={formik.handleChange}
                        error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                        helperText={formik.touched[field.name] && formik.errors[field.name]}
                    />
                </Grid>
            </Grid>
        } else if (field.type === 'radio') {
            fld = <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <RadioGroup
                            name={field.name}
                            value={formik.values[field.name]}
                            onChange={formik.handleChange}
                        >
                            {
                                field.options.map(opt => (
                                    <CheckRadioBox key={opt + '_' + field.name}>
                                        <FormControlLabel value={opt} control={<Radio />} label={opt} />
                                    </CheckRadioBox>
                                ))
                            }
                        </RadioGroup>
                        {formik.touched[field.name] && <FormHelperText error={true}>{formik.errors[field.name]}</FormHelperText>}
                    </FormControl>
                </Grid>
            </Grid>
        } else if (field.type === 'checkbox') {
            fld = <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <FormGroup>
                        {
                            field.options.map(opt => (
                                <CheckRadioBox key={opt + '_' + field.type}>
                                    <FormControlLabel control={
                                        <Checkbox checked={formik.values[field.name].includes(opt)} onChange={(e) => {
                                            const cVal = e.target.checked;
                                            let uVal = formik.values[field.name];
                                            if (cVal) {
                                                uVal = [...uVal, opt];
                                            } else {
                                                uVal = formik.values[field.name].filter(str => str !== opt);
                                            }
                                            formik.setFieldValue(field.name, uVal)
                                        }} />
                                    } label={opt} />
                                </CheckRadioBox>
                            ))
                        }
                        {formik.touched[field.name] && <FormHelperText error={true}>{formik.errors[field.name]}</FormHelperText>}
                    </FormGroup>
                </Grid>
            </Grid>

        }
        return fld;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <FormStep allFields={allFields} step={step} />
            </Grid>
            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={8}>
                <form onSubmit={formik.handleSubmit}>
                    {
                        allFields.map((form, index) => (
                            step === index ?
                                <div key={form.name}>
                                    <Typography paddingBottom={3} variant="h2" sx={{ color: myTheme.palette.primary.main }} component="div">
                                        {form.name}
                                    </Typography>
                                    {
                                        form.fields.map((field) => (
                                            <Box key={field.name} paddingBottom={2}>
                                                <Typography paddingBottom={1} paddingTop={2} sx={{ color: myTheme.palette.grey[900], fontWeight: 400 }} variant="h4" component="div">
                                                    {/* <Typography variant="h4" sx={{ display: 'inline-block', opacity: 0.7, paddingRight: 1 }}>{field.qIndex}.</Typography> */}
                                                    {field.q}
                                                </Typography>
                                                {selectProperFields(field, formik)}
                                            </Box>
                                        ))
                                    }
                                </div> : null
                        ))
                    }

                    <Grid container spacing={1} sx={{ justifyContent: 'end' }} marginTop={1}>
                        {step > 0 ? (
                            <>
                                <Grid item>
                                    <Button
                                        disabled={submitting}
                                        variant="text"
                                        color="primary"
                                        onClick={() => setStep((s) => s - 1)}
                                    >
                                        Back
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Divider orientation="vertical" />
                                </Grid>
                            </>
                        ) : null}
                        <Grid item>
                            <Button
                                startIcon={submitting ? <CircularProgress size="1rem" /> : null}
                                disabled={submitting}
                                variant="text"
                                color="primary"
                                type="submit"
                            >
                                {submitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    );
}

export default Questionnaire;