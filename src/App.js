import './App.css';
import React, {
    useEffect,
    useState
} from 'react';

import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";

const App = () => {
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
        getConfig();
        getData();
        dispatch(connect());
    }, []);

    return (
        <div className="App-header">
            {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                    <>
                        <p>Connect the MetaMask</p>
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(connect());
                                getData();
                            }}
                        >Connect</button>
                        {blockchain.errorMsg !== "" ? (
                            <>
                                <p
                                    style={{
                                        textAlign: "center",
                                        color: "var(--accent-text)",
                                    }}
                                >
                                    {blockchain.errorMsg}
                                </p>
                            </>
                    ) : null}
                </>
                ) : (<>
                        <p>{blockchain.account}</p>
                    </>)
            }
        </div>
    );
}

export default App;