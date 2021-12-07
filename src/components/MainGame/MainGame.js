import React, {
    useEffect,
    useState
} from 'react';

import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";

import "./MainGame.css";

const MainGame = () => {
    const dispatch = useDispatch();
    const blockchain = useSelector((state) => state.blockchain);
    const data = useSelector((state) => state.data);
    const [CONFIG, SET_CONFIG] = useState({
        CONTRACT_ADDRESS: "",
        SCAN_LINK: "",
        NETWORK: {
          NAME: "",
          SYMBOL: "",
          ID: 0,
        },
        NFT_NAME: "",
        SYMBOL: "",
        MAX_SUPPLY: 1,
        WEI_COST: 0,
        DISPLAY_COST: 0,
        GAS_LIMIT: 0,
        MARKETPLACE: "",
        MARKETPLACE_LINK: "",
        SHOW_BACKGROUND: false,
    });

    const getData = () => {
        if (blockchain.account !== "" && blockchain.smartContract !== null) {
          dispatch(fetchData(blockchain.account));
        }
    };
    
    const getConfig = async () => {
        const configResponse = await fetch("/config/config.json", {
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
        });
        const config = await configResponse.json();
        SET_CONFIG(config);
    };

    useEffect(() => {
        // getConfig();
        // getData();
        dispatch(connect());
    }, []);

    return (
        <div>
            <div className="container-minting">
                <p style={{ textAlign: "center", color: "#fff", fontFamily: "Pixel" }}>Ready to Mint ?</p>
                {blockchain.account === "" || blockchain.smartContract === null ? (
                    <>
                        <a
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(connect());
                                getData();
                            }}
                            className="button"
                        >Connect</a>
                        {blockchain.errorMsg !== "" ? (
                            <>
                                <p
                                    style={{
                                        textAlign: "center",
                                        color: "#fff",
                                    }}
                                >
                                    {blockchain.errorMsg}
                                </p>
                            </>
                        ) : null}
                    </>
                    ) : (
                    <>
                        <p style={{color: "white", textAlign: "center", fontFamily: "Pixel"}}>
                            {blockchain.account}
                        </p>
                    </>
                    )
                }
            </div>
        </div>
    )
}

export default MainGame;