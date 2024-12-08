"use client";

import { useEffect, useState } from "react";
import axios from "axios";

function CardStatsWrapper() {
    const [stats, setStats] = useState();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("/api/form");
                console.log("res:", res);

                // TODO setStats 
            } catch (error) {
                console.log("error in fetching stats:", error);
            }
        }
        fetchStats();
    }, [])
    return (
        <div>

        </div>
    )
}

export default CardStatsWrapper
