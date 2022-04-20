import React from "react";

import { styled, useTheme } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';

const EachStep = styled('div', {
    shouldForwardProp: (prop) => prop !== 'current' && prop !== 'completed',
    // if props are not valid attr and to be used for css/condition we can use 'shouldForwardProp' to prevent adding these as attr to the element
    // e.g. prop !== 'open' && prop !== 'bColor' (for multiple props which are invalid attrs )
})(({ theme, current, completed }) => {
    // console.log(theme);
    return ({
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'right',
        justifyContent: 'center',
        height: 90,
        fontSize: 15,
        paddingRight: 80,
        zIndex: 1,
        color: '#333',
        position: 'relative',
        ...(current && {
            color: theme.palette.primary.main
        }),
        ...(completed && {
            color: '#777',
            '& span': {
                color: '#999'
            }
        }),
        '& span': {
            fontSize: 12,
            color: '#888'
        }
    })
});

const EachStepcircle = styled('div', {
    shouldForwardProp: (prop) => prop !== 'current' && prop !== 'completed',
    // if props are not valid attr and to be used for css/condition we can use 'shouldForwardProp' to prevent adding these as attr to the element
    // e.g. prop !== 'open' && prop !== 'bColor' (for multiple props which are invalid attrs )
})(({ theme, current, completed }) => {
    // console.log(theme);
    return ({
        position: 'absolute',
        right: 20,
        top: '50%',
        marginTop: -15,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
        border: '1px solid ' + theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 13,
        fontWeight: 500,
        ...(current && {
            backgroundColor: theme.palette.primary.main,
            color: '#fff'
        }),
        ...(completed && {
            borderColor: theme.palette.success.main
        }),
    })
});

const StepWrapper = styled('div')(({ theme }) => {
    // console.log(theme);
    return ({
        position: 'relative',
        '&:after': {
            content: "''",
            position: 'absolute',
            right: 35,
            top: 0,
            bottom: 0,
            zIndex: 0,
            borderRight: '1px dashed #ccc'
        }
    })
});

const FormStep = ({ allFields, step }) => {
    // console.log(allFields);
    return (
        <StepWrapper>
            {allFields.map((item, index) => (
                <EachStep current={step === index} completed={step > index} key={item.name + '_step'}>
                    {item.name}
                    <span>{item.desc}</span>
                    {step <= index && <EachStepcircle current={step === index}>{index + 1}</EachStepcircle>}
                    {step > index && <EachStepcircle completed={true} current={step === index}><CheckIcon color="success" /></EachStepcircle>}
                </EachStep>
            ))}
        </StepWrapper>
    )
}

export default FormStep;