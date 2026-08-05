const User = require("../models/User");
const Service = require("../models/Service");
const Booking = require("../models/Booking");


// ================= GET ALL USERS =================

exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};
// ================= GET SINGLE USER =================

exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ================= UPDATE USER ROLE =================

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    // Validate Role
    if (!["user", "expert", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // Find User
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update Role
    user.role = role;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= DELETE USER =================

exports.deleteUser = async (req, res) => {
  try {
    // Find User
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent Admin from deleting himself
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ================= GET ALL SERVICES =================

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("provider", "name email phone role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// // ================= DELETE ANY SERVICE =================

// exports.deleteService = async (req, res) => {
//   try {
//     // Find Service
//     const service = await Service.findById(req.params.id);

//     if (!service) {
//       return res.status(404).json({
//         success: false,
//         message: "Service not found",
//       });
//     }

//     // Delete Service
//     await Service.findByIdAndDelete(req.params.id);

//     res.status(200).json({
//       success: true,
//       message: "Service deleted successfully",
//     });

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };
// ================= GET ALL BOOKINGS =================

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "name email phone")
      .populate("provider", "name email phone")
      .populate("service", "title category price location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ================= DELETE ANY SERVICE =================
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Check Active Bookings
    const activeBooking = await Booking.findOne({
      service: req.params.id,
      status: { $in: ["pending", "accepted"] },
    });

    if (activeBooking) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete service with active bookings",
      });
    }

    // Delete Service
    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ================= DASHBOARD STATISTICS =================

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalExperts = await User.countDocuments({
      role: "expert",
    });

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    const totalServices = await Service.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const pendingBookings = await Booking.countDocuments({
      status: "pending",
    });

    const acceptedBookings = await Booking.countDocuments({
      status: "accepted",
    });

    const completedBookings = await Booking.countDocuments({
      status: "completed",
    });

    const cancelledBookings = await Booking.countDocuments({
      status: "cancelled",
    });

    // Revenue from completed bookings
    const revenueResult = await Booking.aggregate([
      {
        $match: {
          status: "completed",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    res.status(200).json({
      success: true,

      dashboard: {
        totalUsers,
        totalExperts,
        totalAdmins,
        totalServices,
        totalBookings,

        pendingBookings,
        acceptedBookings,
        completedBookings,
        cancelledBookings,

        totalRevenue,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// ================= GET PENDING EXPERT REQUESTS =================

exports.getPendingExperts = async (req, res) => {
  try {
    const experts = await User.find({
      expertRequest: true,
      isApproved: false,
    }).select('-password');

    res.status(200).json({
      success: true,
      count: experts.length,
      experts,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// ================= APPROVE EXPERT =================

exports.approveExpert = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.role = 'expert';
    user.isApproved = true;
    user.expertRequest = false;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Expert approved successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};