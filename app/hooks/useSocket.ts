import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

// Tipe untuk opsi koneksi
export interface SocketOptions {
  autoConnect?: boolean;
  handshakeData?: Record<string, any>;
}

// Tipe untuk hook useSocket
export interface UseSocket {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  ReceiveData: (eventName: string) => any;
  sendData: (eventName: string, value: any) => void;
}

// Hook useSocket
const useSocket = (
  url: string,
  options: SocketOptions = { autoConnect: true }
): UseSocket => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [receivedData, setReceivedData] = useState<any>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Validasi URL
    if (!url) {
      console.error("URL tidak boleh kosong");
      return;
    }

    // Membuat instansi socket dengan opsi handshake
    socketRef.current = io(url, {
      autoConnect: options.autoConnect,
      auth: options.handshakeData, // Menambahkan opsi handshake dengan `auth`
    });

    // Event ketika terhubung
    socketRef.current.on("connect", () => {
      setIsConnected(true);
      console.log("Terhubung ke socket:", url);
    });

    // Event ketika terputus
    socketRef.current.on("disconnect", () => {
      setIsConnected(false);
      console.log("Socket terputus dari:", url);
    });

    // Membersihkan koneksi ketika komponen unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [url, options.autoConnect, options.handshakeData]);

  // Fungsi untuk menghubungkan socket secara manual
  const connect = () => {
    if (socketRef.current && !socketRef.current.connected) {
      socketRef.current.connect();
    }
  };

  // Fungsi untuk memutuskan koneksi socket secara manual
  const disconnect = () => {
    if (socketRef.current?.connected) {
      socketRef.current?.disconnect();
    }
  };

  // Hook untuk menerima data dari socket
  const ReceiveData = (eventName: string) => {
    useEffect(() => {
      if (!eventName) {
        console.error("Event name tidak boleh kosong");
        return;
      }

      const socket = socketRef.current;

      if (socket) {
        const handleData = (data: any) => {
          console.log("Data diterima:", data);
          setReceivedData(data);
        };

        // Mendengarkan event yang diberikan
        socket.on(eventName, handleData);

        // Membersihkan event listener ketika komponen unmount atau event berubah
        return () => {
          socket.off(eventName, handleData);
        };
      }
    }, [eventName]);

    return receivedData;
  };

  const sendData = (eventName: string, value: any) => {
    socketRef.current?.emit(eventName, value, function (data: any) {
      if (!data) console.error("data tidak terkirim");
      console.log("data terkirim");
    });
  };

  return { isConnected, connect, disconnect, ReceiveData, sendData };
};

export default useSocket;
