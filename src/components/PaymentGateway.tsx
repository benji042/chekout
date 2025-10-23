import { ASAP, useASAP } from '@asap-crypto/react-sdk';
import { X, CreditCard } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface PaymentGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  cartTotal: number;
  onClearCart: () => void; 
}

const secretKey = import.meta.env.VITE_ASAP_SECRET_KEY;

export function PaymentGateway({
    isOpen,
    onClose,
    cartTotal,
    onClearCart
}: PaymentGatewayProps) {
    const { transaction } = useASAP();

    useEffect(() => {
        if(transaction.status === "success") {
            setTimeout(() => {
                toast.success("Transaction successful");

                onClearCart();

                onClose();
            }, 3000);
        }
    }, [transaction])

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                        <CreditCard size={28} />
                        <span>Payment Gateway</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                    <div className="flex flex-col h-full justify-between">
                        <div className="space-y-4">
                            <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors">
                                Pay with Credit/Debit Card
                            </button>

                            <button className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors">
                                Pay with Bank Transfer
                            </button>

                            <ASAP
                                secretKey={secretKey}
                                currency='NGN'
                                amount={cartTotal}
                                bgColor='#111828'
                                textColor='#ffffff'
                            />
                        </div>

                        <div className="">
                            <button
                                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                            >
                                Cancel Payment
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-6 py-4 space-y-4">
                    <div className="flex items-center justify-between text-lg">
                        <span className="font-semibold text-gray-900">Subtotal:</span>
                        <span className="font-bold text-2xl text-gray-900">
                            &#8358;{cartTotal.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}