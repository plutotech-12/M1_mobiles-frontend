"use client";

import { useEffect, useState } from "react";
import api from "../../../lib/api";
import { Loader2 } from "lucide-react";

export default function BuybackRequests() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/buyback");
        setRequests(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="py-20 flex justify-center"><Loader2 className="h-10 w-10 text-orange-600 animate-spin" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Buyback Requests</h1>

      <div className="space-y-4">
        {requests.map((r) => (
          <div key={r._id} className="bg-white rounded-xl p-4 shadow">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">{r.name} — {r.phone}</p>
                <p className="text-sm text-gray-600">{r.deviceBrand} {r.deviceModel}</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">{r.status}</p>
                <p className="text-gray-500">{new Date(r.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
