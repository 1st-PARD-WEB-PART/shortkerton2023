import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';

const H1 = styled.div`
display: inline;
`

export default function BasicTextFields() {
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <H1>이름</H1><TextField id="outlined-basic" label="이름" variant="outlined" /><br></br>
            <H1>닉네임</H1><TextField id="outlined-basic" label="닉네임" variant="outlined" /><br></br>
            <H1>휴대폰번호</H1><TextField id="outlined-basic" label="휴대폰번호" variant="outlined" /><br></br>
            <Stack spacing={2} direction="row">
                <Button variant="contained">수정하기</Button>
            </Stack>
            <div>
                <H1>알림설정</H1><br></br>
                <H1>메일 알림</H1><Switch {...label} defaultChecked /><br></br>
                <H1>문자 알림</H1><Switch {...label} defaultChecked />
            </div>
            <Stack spacing={2} direction="row">
                <Button variant="contained">로그아웃</Button>
            </Stack>
        </Box>
    );
}