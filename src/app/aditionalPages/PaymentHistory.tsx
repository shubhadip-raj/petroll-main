import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../layout/Layout";
import { IonIcon } from "@/components/ui/IonIcon";
import { UserContext } from "@/contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const PaymentHistory = () => {
  const { user, token } = useContext(UserContext);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* 📥 Fetch Payment History */
  const fetchPaymentHistory = async () => {
    if (!user?.userId) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/payments/user/${user.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch payments");
      }

      const data = await response.json();
      setPayments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, [user]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 space-y-6">

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="bg-orange-100 dark:bg-orange-500/20 p-4 rounded-full">
                <IonIcon
                  name="wallet-outline"
                  className="text-orange-500 text-4xl"
                />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Payment History
            </h1>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              View all your past transactions
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center text-gray-500">Loading payments...</div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center text-red-500">{error}</div>
          )}

          {/* Empty State */}
          {!loading && payments.length === 0 && (
            <div className="text-center text-gray-500">
              No payments found.
            </div>
          )}

          {/* Payment List */}
          {!loading && payments.length > 0 && (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="border rounded-2xl p-4 flex justify-between items-center bg-gray-50 dark:bg-gray-700"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {payment.paymentFor === "petCloud"
                        ? "Pet Cloud Premium"
                        : "QR Pass"}
                    </p>

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Pet: {payment.petName}
                    </p>

                    <p className="text-xs text-gray-500">
                      TXN: {payment.transactionId}
                    </p>

                    <p className="text-xs text-gray-400">
                      {new Date(payment.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-orange-500">
                      {payment.paymentAmount}
                    </p>

                    {/* <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold
                        ${
                          payment.status === "APPROVED"
                            ? "bg-green-100 text-green-600"
                            : payment.status === "REJECTED"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                      {payment.status || "PENDING"}
                    </span> */}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </Layout>
  );
};

export default PaymentHistory;