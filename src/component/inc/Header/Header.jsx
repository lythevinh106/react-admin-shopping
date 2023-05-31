import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import dayjs from 'dayjs';
import {
    Avatar,
    Button,
    Grid,
    InputAdornment,
    OutlinedInput,
    Paper,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { customTheme } from "../../CreateTheme";
import { AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { style } from "@mui/system";
import styled from "styled-components";
import myColor from "../../myColor/myColor";
import Pusher from "pusher-js";
import CampaignIcon from "@mui/icons-material/Campaign";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import AxiosAdmin from "../../../ApiServices/AxiosAdmin";
import OrderApi from "../../../ApiServices/OrderApi";
import { useRef } from "react";
import { useSnackbar } from "notistack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../features/order/orderSlice";
Header.propTypes = {};

function Header(props) {
    const [alerts, SetAlerts] = useState([]);
    const [uncheckAlert, SetUncheckAlert] = useState([]);
    const [countAlert, SetCountAlert] = useState(0);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    // let uncheckAlert = useRef(0);

    useEffect(() => {
        (async () => {
            try {
                let response = await OrderApi.showNofi();

                if (response.original.status == 201) {
                    const newData = response.original.data.map((data) => {
                        return {
                            ...data,
                        };
                    });
                    SetAlerts(newData);
                }
            } catch (error) { }
        })();

        const pusher = new Pusher("d4edcb8beb9487ea35a0", {
            cluster: "ap1",
            encrypted: false,
            useTLS: false,
            tls: false,
            broadcaster: "pusher",

            // optional configuration options
        });

        const channel = pusher.subscribe("order-product");
        console.log(channel);
        channel.bind("order-product-event", function (data) {
            // console.log('Received event:', data.data);
            // Xử lý logic khi nhận được sự kiện

            const newData = {
                ...data.data,
                order_item: JSON.stringify(data.data.order_item),
            };

            SetAlerts((prev) => {
                return [newData, ...prev];
            });

            enqueueSnackbar("Vừa có đơn hàng mới.", { variant: "success" });
        });

        return () => {
            // pusher.disconnect();
            // channel.unbind('my-event');
            pusher.unsubscribe("order-product");
        };
    }, []);

    useEffect(() => {
        let newAlerts = [...alerts];
        const count = newAlerts.filter((alert) => {
            return alert.is_read == 0;
        });

        SetUncheckAlert(count);
        SetCountAlert(count.length)
    }, [alerts]);

    console.log(alerts);
    // console.log(uncheckAlert);

    return (
        <div className="dashboard-header" style={{}}>
            <Paper elevation={12}>
                <Box
                    sx={{
                        maxWidth: "100%",
                        height: "70px",
                        padding: "0px 18px",
                    }}
                >

                    <Grid container alignItems={"center"} height="100%">
                        <Grid item lg={2}>
                            <Typography
                                onClick={() => {

                                    navigate("", {
                                        replace: true
                                    })
                                }}
                                color={myColor.greenSecond}
                                sx={{
                                    fontWeight: "bold",
                                }}
                                variant="h6"
                            >
                                HALO SHOP
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            {/* <Paper elevation={4}>
                                <TextField
                                    label="Tìm Kiếm"
                                    size="small"
                                    sx={{
                                        backgroundColor: '#fff',
                                        borderRadius: 15

                                    }}

                                />
                            </Paper> */}
                            {/* <Button

                                sx={{
                                    marginLeft: "20px",
                                    borderRadius: 10,
                                    backgroundImage: `linear-gradient(${myColor.greenSecond},${myColor.greenDefault})`,
                                    color: "white",
                                    width: "150px",

                                }}>
                                <CampaignIcon />
                                <Box
                                    sx={{
                                        marginLeft: "5px",
                                        backgroundColor: "red",
                                        width: "25px",
                                        height: "25px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "13px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    25

                                </Box>
                            </Button> */}

                            <Tooltip
                                sx={
                                    {
                                        // position: "relative",
                                    }
                                }
                                title={
                                    <Box
                                        sx={
                                            {
                                                // position: "absolute",
                                            }
                                        }
                                    >
                                        {alerts && alerts.map((alert) => {
                                            return (
                                                <Box
                                                    onClick={() => {
                                                        // dispatch(setFilter({
                                                        //     search: alert.order_token
                                                        // }))

                                                        navigate("/?order_token=" + alert.order_token, { replace: true })

                                                    }}
                                                    sx={{
                                                        fontSize: "13px !important",
                                                        display: "flex",

                                                        cursor: "pointer",
                                                        padding: "10px",
                                                    }}
                                                >


                                                    <Box>

                                                        <CheckCircleIcon
                                                            sx={{ color: "rgb(0, 72, 61)" }}
                                                        ></CheckCircleIcon>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            marginLeft: "15px",
                                                        }}
                                                    >
                                                        {" "}
                                                        <Typography
                                                            sx={{ fontSize: "13px", fontWeight: "600" }}
                                                        >
                                                            Đơn Hàng Mới Có Mã:{alert.order_token}
                                                        </Typography>
                                                        <Typography sx={{ fontSize: "12px" }}>
                                                            Thời Gian: {alert.id + dayjs(alert.created_at).format('YYYY-MM-DD h:mm A')}
                                                        </Typography>
                                                    </Box>
                                                </Box>)

                                        })}

                                    </Box>
                                }
                            >
                                <Badge badgeContent={uncheckAlert.length > 5 ? "5++" : uncheckAlert.length} color="primary">
                                    <MailIcon
                                        color="action"
                                        sx={{ cursor: "pointer" }}

                                        onMouseEnter={() => {


                                            SetCountAlert(0);

                                        }

                                        }

                                        onMouseLeave={async () => {
                                            try {
                                                let response = await OrderApi.updateNofi();
                                                if (response.original.status == 201) {
                                                    let newAlerts = [...alerts];
                                                    // SetUncheckAlert(0);
                                                    newAlerts = alerts.map((alert) => {
                                                        return {
                                                            ...alert,
                                                            is_read: true,
                                                        };
                                                    });
                                                    SetAlerts((prev) => {
                                                        return [...newAlerts];
                                                    });
                                                }
                                            } catch (error) { }
                                        }}
                                    />
                                </Badge>
                            </Tooltip>
                        </Grid>
                        <Grid
                            item
                            lg={2}
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Avatar />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </div>
    );
}

export default Header;
