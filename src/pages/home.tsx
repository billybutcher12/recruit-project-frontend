import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, ArrowUp, Users, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { createClient } from "@supabase/supabase-js";
import NavigationBar from "@/components/ui/navigation-bar"; // Thêm import

// Khởi tạo Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Định nghĩa kiểu cho token decoded
interface JwtPayload {
  id: string;
  role: string;
  user_metadata?: {
    full_name?: string;
    role?: string; // Thêm role vào user_metadata
  };
  iat?: number;
  exp?: number;
}

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (token && role) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        setIsLoggedIn(true);
        setUserName(decoded.user_metadata?.full_name || "Người dùng");
        setUserRole(role); // Sử dụng role từ localStorage
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        setIsLoggedIn(false);
        setUserRole(null);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      setIsLoggedIn(false);
      setUserName("");
      setUserRole(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 400 },
    },
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen pt-16">
      <NavigationBar /> {/* Thay header bằng NavigationBar */}

      {/* Hero Banner */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80"
          alt="Office team"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Chào mừng đến với XYZ Corp
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-center max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Cùng chúng tôi xây dựng tương lai!
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Company Promotion Section */}
        <motion.div
          className="mb-16 bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <motion.div
              className="p-8 flex flex-col justify-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.h2
                className="text-3xl font-bold mb-4 text-blue-700"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Về XYZ Corp
              </motion.h2>
              <motion.p
                className="text-gray-600 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Thành lập từ năm 2010, XYZ Corp đã trở thành một trong những
                công ty hàng đầu trong lĩnh vực công nghệ tại Việt Nam. Chúng
                tôi tự hào về đội ngũ nhân viên tài năng và văn hóa làm việc đề
                cao sự sáng tạo và đổi mới.
              </motion.p>
              <motion.div
                className="grid grid-cols-2 gap-4 mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    500+
                  </div>
                  <div className="text-sm text-gray-600">Nhân viên</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    15+
                  </div>
                  <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative h-[400px] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Company team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                  >
                    <div className="text-xl font-semibold mb-1">
                      Đội ngũ chuyên nghiệp
                    </div>
                    <div className="text-sm opacity-90">
                      Cùng nhau xây dựng tương lai
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        {/* Why Choose Us Section */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
            variants={itemVariants}
          >
            Tại sao chọn chúng tôi
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground"
            variants={itemVariants}
          >
            XYZ Corp là đối tác lý tưởng cho sự phát triển nghề nghiệp của bạn
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-blue-100"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Pencil className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-700 text-center">
              Môi trường sáng tạo
            </h3>
            <p className="text-muted-foreground text-center">
              Chúng tôi khuyến khích sự sáng tạo và đổi mới trong mọi dự án,
              giúp bạn phát huy tối đa tiềm năng.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-blue-100"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <ArrowUp className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-700 text-center">
              Cơ hội phát triển
            </h3>
            <p className="text-muted-foreground text-center">
              Chúng tôi cung cấp các cơ hội học tập và phát triển liên tục, giúp
              bạn tiến xa hơn trong sự nghiệp.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-lg shadow-md border border-blue-100"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-700 text-center">
              Đội ngũ chuyên nghiệp
            </h3>
            <p className="text-muted-foreground text-center">
              Làm việc cùng những chuyên gia hàng đầu trong ngành, học hỏi và
              phát triển trong môi trường chuyên nghiệp.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="py-16 bg-blue-600 rounded-xl shadow-xl mb-16 overflow-hidden relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-30"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-48 h-48 bg-blue-700 rounded-full opacity-20"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut",
            }}
          />

          <div className="text-center px-4 relative z-10">
            <h2 className="text-3xl font-bold text-white mb-6">
              Sẵn sàng khám phá cơ hội mới?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Tìm kiếm vị trí phù hợp với kỹ năng và đam mê của bạn trong danh
              sách việc làm đa dạng của chúng tôi.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:translate-y-[-3px] shadow-lg hover:shadow-xl px-8 py-6 text-lg"
                >
                  <Link to="/recruitment">Khám phá việc làm</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full py-4 bg-gray-100 text-center text-gray-600 text-sm">
        © 2025 XYZ Corp
      </div>
    </div>
  );
}