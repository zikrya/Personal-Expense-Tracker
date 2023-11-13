
    
    return (
        <section className="bg-custom-gradient flex items-center justify-center h-screen font-custom">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="mb-4 text-2xl font-bold text-gray-900 text-center">
                    Login
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Your email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="name@company.com" required=""/>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required="" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="mr-2 w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400" required=""/>
                            <label htmlFor="remember" className="text-sm text-gray-500">Remember me</label>
                        </div>
                        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">Forgot password?</a>
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting} className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">{isSubmitting ? "Logging in..." : "Login"}</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Login;